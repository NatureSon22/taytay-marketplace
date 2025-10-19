import { sendVerification } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSendVerification = () => {
  return useMutation({
    mutationFn: (email: string) => sendVerification(email),
    onSuccess: () => {
      toast.success("Verification code sent. Please check your email");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again");
    },
  });
};

export default useSendVerification;
