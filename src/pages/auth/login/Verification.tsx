import CenterLayout from "@/layouts/CenterLayout";
import ContentGrid from "@/layouts/ContentGrid";
import PadLayout from "@/layouts/PadLayout";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/assets/hero-logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { NavigateState } from "./Login";
import useSendVerification from "@/hooks/useSendVerification";
import { useMutation } from "@tanstack/react-query";
import { loginVerification, type LoginVerification } from "@/api/auth";
import { toast } from "sonner";
import useStoreState from "@/stores/useStoreState";
import useAccountStore from "@/stores/useAccountState";

const formSchema = z.object({
  pin: z.string().length(6, { message: "Verification code must be 6 digits." }),
});

type Form = z.infer<typeof formSchema>;

const MAX_ATTEMPTS = 3;
const RESEND_TIMER = 60;

function Verification() {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: { pin: "" },
  });

  const navigate = useNavigate();
  const location = useLocation() as { state?: NavigateState };
  const { isAuthenticated = false, data, userType } = location.state || {};

  const [time, setTime] = useState(RESEND_TIMER);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const { setStore } = useStoreState();

  const { mutate: onSendVerification, isPending: sendVerificationLoading } =
    useSendVerification();

  const { mutate: verifyCode, isPending: verifyLoading } = useMutation({
    mutationFn: (data: LoginVerification) => loginVerification(data),
    onSuccess: () => {
      toast.success("Verification successful!");

      if (!data) return;

      if ("publicUser" in data) {
        useAccountStore.getState().setSellerAccount({
          ...data.publicUser,
          userType: "account",
        });

        setStore(data.store);
        navigate("/");
      } else {
        useAccountStore.getState().setAdminAccount({
          ...data,
        });
        navigate("/admin/dashboard");
      }
    },
    onError: (err) => {
      setFailedAttempts((prev) => prev + 1);
      toast.error(err.message || "Invalid or expired code.");
    },
  });

  // redirect if user came here without logging in
  useEffect(() => {
    if (!isAuthenticated || !data) {
      navigate("/login");
    }
  }, [isAuthenticated, data, navigate]);

  // countdown timer
  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  // resend verification code
  const handleSendVerification = () => {
    if (!data) return;
    setTime(RESEND_TIMER);

    const email = "publicUser" in data ? data.publicUser.email : data.email;

    onSendVerification(email);
    toast.success("A new verification code has been sent!");
  };

  // submit verification code
  const onSubmit = (formdata: Form) => {
    if (!data || !userType) return;

    const userData = "publicUser" in data ? data.publicUser : data;
    const id = "publicUser" in data ? data.publicUser._id : data._id;

    if (!id) return;

    console.log(formdata.pin);
    console.log(userData.email);
    console.log(id);
    console.log(userType);

    verifyCode({
      code: formdata.pin,
      email: userData.email,
      userId: id,
      userType: userType,
    });
  };

  return (
    <PadLayout>
      <CenterLayout>
        <ContentGrid>
          <div className="grid place-items-center">
            <div className="w-full max-w-[470px] my-20 border border-slate-200 rounded-2xl shadow-sm">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="box-shadow w-full space-y-5 rounded-lg p-6 pt-14"
                >
                  <div className="mb-8 flex justify-center">
                    <img
                      src={logo}
                      alt="GuideURSelf Logo"
                      className="w-[200px]"
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <p className="mb-3 text-[0.85rem] text-200/60">
                          Enter the 6-digit verification code
                        </p>
                        <FormControl>
                          <div>
                            <InputOTP
                              maxLength={6}
                              {...field}
                              pattern={REGEXP_ONLY_DIGITS}
                              disabled={
                                failedAttempts >= MAX_ATTEMPTS || verifyLoading
                              }
                            >
                              <InputOTPGroup className="flex w-full gap-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                  <InputOTPSlot
                                    className="flex-1 rounded-md border border-slate-400 py-8 text-2xl font-semibold shadow-none"
                                    key={index}
                                    index={index}
                                    inputMode="numeric"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {failedAttempts >= MAX_ATTEMPTS && (
                    <p className="text-red-500 text-center text-sm">
                      You have reached the maximum number of attempts. Please
                      try again later.
                    </p>
                  )}

                  <div className="space-y-2 pt-4">
                    <Button
                      type="submit"
                      className="w-full py-6 text-[1rem] font-semibold bg-200"
                      disabled={verifyLoading || failedAttempts >= MAX_ATTEMPTS}
                    >
                      {verifyLoading ? "Verifying..." : "Verify"}
                    </Button>

                    {failedAttempts < MAX_ATTEMPTS ? (
                      <Button
                        onClick={handleSendVerification}
                        className="w-full py-6 text-[1rem] font-semibold border border-slate-300"
                        variant="outline"
                        disabled={time !== 0 || sendVerificationLoading}
                      >
                        {time === 0 ? (
                          <p className="font-semibold">Resend</p>
                        ) : (
                          <>
                            Didn&apos;t receive a code?{" "}
                            <span className="font-semibold">
                              Resend in {time}s
                            </span>
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate("/login")}
                        className="w-full py-6 text-[1rem] font-semibold"
                      >
                        Return to Login
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </ContentGrid>
      </CenterLayout>
    </PadLayout>
  );
}

export default Verification;
