import storeDetailsPlaceholder from "@/data/storedetails";
import type { Store } from "@/types";
import { formatDate } from "@/utils/formatDate";
import {
  Package2,
  Users,
  Phone,
  AtSign,
  Store as StoreIcon,
} from "lucide-react";
import parse from "html-react-parser";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type StoreProfileProps = {
  store?: Store | null;
  showExtraProps?: boolean;
  isLoading?: boolean;
};

const StoreProfile = ({
  store = {} as Store,
  showExtraProps = true,
  isLoading = false,
}: StoreProfileProps) => {
  return (
    <div className="space-y-10">
      <div className="bg-slate-50 grid md:grid-cols-2 lg:grid-cols-4 border border-gray-100">
        {/* Profile */}
        <div className="py-7 flex gap-5 items-center justify-center">
          <div className="size-20 rounded-full">
            {isLoading ? (
              <Skeleton className="size-20 rounded-full bg-slate-300" />
            ) : (
              <img
                className="w-full h-full object-cover rounded-full"
                src={
                  store?.profilePicture ||
                  storeDetailsPlaceholder.profilePicture
                }
                alt=""
              />
            )}
          </div>

          <div>
            <div className="text-2xl uppercase font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-32 bg-slate-300" />
              ) : (
                store?.storeName
              )}
            </div>

            <p className="text-slate-400 text-[0.9rem]">{store?.organizationName}</p>
          </div>
        </div>

        {/* Products + Joined */}
        <div className="py-7 flex flex-col gap-5 items-center justify-center">
          <div className="flex gap-3 items-center">
            <Package2 className="w-5" />
            {isLoading ? (
              <Skeleton className="h-5 w-40 bg-slate-300" />
            ) : (
              <p>
                Products:
                <span className="ml-3 font-bold text-100">
                  {store?.noOfProducts || 0}
                </span>
              </p>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <Users className="w-5" />
            {isLoading ? (
              <Skeleton className="h-5 w-40 bg-slate-300" />
            ) : (
              <p>
                Joined
                <span className="ml-3 font-bold text-100">
                  {formatDate(
                    store?.joinedDate || storeDetailsPlaceholder.joinedDate
                  )}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="py-7 flex flex-col gap-5 items-center justify-center">
          <div className="flex gap-3 items-center">
            <Phone className="w-5" />
            {isLoading ? (
              <Skeleton className="h-5 w-40 bg-slate-300" />
            ) : (
              <p>
                Contact No
                <span className="ml-3 font-bold text-100">
                  {store?.contactNumber ||
                    storeDetailsPlaceholder.contactNumber}
                </span>
              </p>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <AtSign className="w-5" />
            {isLoading ? (
              <Skeleton className="h-5 w-40 bg-slate-300" />
            ) : (
              <p>
                Email
                <span className="ml-3 font-bold text-100">
                  {store?.email || storeDetailsPlaceholder.email}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Stall Numbers */}
        <div className="py-7 flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-3 items-center">
            <StoreIcon className="w-5" />
            {isLoading ? (
              <Skeleton className="h-5 w-40 bg-slate-300" />
            ) : (
              <p>
                Stall No.
                <span className="ml-3 font-bold text-100">
                  {store?.stallNumbers?.join(", ")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {showExtraProps && (
        <div className="flex flex-col gap-7 lg:flex-row xl:gap-14">
          <div
            className={cn(
              "text-justify leading-6 lg:w-[75%] xl:w-[65%]",
              store?.description ? "" : "text-slate-500"
            )}
          >
            {isLoading ? (
              <Skeleton className="h-32 w-full bg-slate-300" />
            ) : (
              parse(
                store?.description ??
                  "This store hasn’t added a description yet. Stay tuned!"
              )
            )}
          </div>

          <div className="flex-1 flex gap-4 flex-col md:flex-row 2xl:flex-col">
            {isLoading ? (
              <div className="flex gap-4">
                <Skeleton className="h-20 w-28 bg-slate-300" />
                <Skeleton className="h-20 w-28 bg-slate-300" />
              </div>
            ) : (
              store?.linkedAccounts &&
              store.linkedAccounts.length > 0 && (
                <div className="flex-1 space-y-3">
                  <p className="text-slate-500 text-[0.95rem] lg:text-center">
                    Linked Accounts
                  </p>
                  <div className="flex gap-y-5 gap-x-7 flex-wrap justify-evenly items-center">
                    {store.linkedAccounts.map((account, i) => (
                      <a
                        key={i}
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-28 md:w-32">
                          <img src={account.logo} alt="" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProfile;
