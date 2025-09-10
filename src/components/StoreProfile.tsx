import storedetails from "@/data/storedetails";
import {
  Package2,
  Users,
  Phone,
  AtSign,
  Store as StoreIcon,
} from "lucide-react";

type StoreProfileProps = {
  showExtraProps?: boolean;
};

const StoreProfile = ({ showExtraProps = true }: StoreProfileProps) => {
  return (
    <div className="space-y-10">
      <div className="bg-slate-50 grid md:grid-cols-2 lg:grid-cols-4 border border-gray-100">
        <div className="py-7 flex gap-5 items-center justify-center">
          <div className="size-20 rounded-full">
            <img
              className="w-full h-full object-cover"
              src={storedetails.profilePicture}
              alt=""
            />
          </div>
          <p className="text-2xl uppercase font-bold">
            {storedetails.storeName}
          </p>
        </div>

        <div className="py-7 flex flex-col gap-5 items-center justify-center">
          <div className="flex gap-3 items-center">
            <Package2 className="w-5" />
            <p>
              Products:
              <span className="ml-3 font-bold text-100">3</span>
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Users className="w-5" />
            <p>
              Joined
              <span className="ml-3 font-bold text-100">
                {storedetails.joinedDate}
              </span>
            </p>
          </div>
        </div>

        <div className="py-7 flex flex-col gap-5 items-center justify-center">
          <div className="flex gap-3 items-center">
            <Phone className="w-5" />
            <p>
              Contact No
              <span className="ml-3 font-bold text-100">
                {storedetails.contactNo}
              </span>
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <AtSign className="w-5" />
            <p>
              Email
              <span className="ml-3 font-bold text-100">
                {storedetails.email}
              </span>
            </p>
          </div>
        </div>

        <div className="py-7 flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-3 items-center">
            <StoreIcon className="w-5" />
            <p>
              Stall No.
              <span className="ml-3 font-bold text-100">
                {storedetails.stallNumbers.join(" ")}
              </span>
            </p>
          </div>
        </div>
      </div>

      {showExtraProps && (
        <div className="flex flex-col gap-7 lg:flex-row xl:gap-14">
          <div className="text-justify leading-6 lg:w-[75%] xl:w-[65%]">
            {storedetails.description}
          </div>

          <div className="flex-1 flex gap-4 flex-col md:flex-row 2xl:flex-col">
            {storedetails.linkedAccounts &&
              storedetails.linkedAccounts.length > 0 && (
                <div className="flex-1 space-y-3">
                  <p className="text-slate-500 text-[0.95rem] lg:text-center">
                    Linked Accounts
                  </p>
                  <div className="flex gap-y-5 gap-x-7 flex-wrap justify-evenly items-center">
                    {storedetails.linkedAccounts.map((account, i) => {
                      return (
                        <div key={i} className="w-28 md:w-32">
                          <img src={account.logo} alt="" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {storedetails.paymentMode &&
              storedetails.paymentMode.length > 0 && (
                <div className="flex-1 space-y-3">
                  <p className="text-slate-500 text-[0.95rem] lg:text-center">
                    Modes of Payment
                  </p>

                  <div className="flex gap-y-5 gap-x-7 flex-wrap justify-evenly items-center">
                    {storedetails.paymentMode.map((account, i) => {
                      return (
                        <div key={i} className="w-28 md:w-32">
                          <img src={account.logo} alt="" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProfile;
