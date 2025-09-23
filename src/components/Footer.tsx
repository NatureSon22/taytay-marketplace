import footerLogo from "@/assets/footer-logo.png";
import department from "@/assets/dep.png";
import footerMainLogo from "@/assets/footer-main-logo.png";
import footerNav from "@/data/footer";
import { Link } from "react-router";

function Footer() {
  return (
    <>
      <div className="bg-200 grid place-items-center py-14 lg:py-20">
        <div className="w-[80%] flex flex-col gap-16 items-center md:justify-between lg:flex-row lg:w-[70%]">
          <div className="mx-auto space-y-5 max-w-[300px] flex flex-col items-center md:mx-0 md:items-start">
            <img className="w-min h-min" src={footerMainLogo} />
            <p className="text-white font-light text-[0.9rem] text-center md:text-left md:font-normal lg:text-[0.95rem]">
              Find quality clothes and garments in Taytay Tiangge anytime and
              anywhere you are!
            </p>
          </div>

          <div className="w-full flex flex-col gap-10 items-center sm:w-[80%] sm:flex-row sm:items-start sm:justify-around lg:w-[60%]">
            {footerNav.map((nav, i) => {
              return (
                <div
                  key={nav.title}
                  className="text-white w-[150px] space-y-7 md:w-max"
                >
                  <div className="relative">
                    <p className="text-[1.2rem] font-semibold">{nav.title}</p>
                    <div
                      className={`py-[2px] absolute w-[40px] -bottom-2 rounded-full ${
                        i == 0 ? "bg-100" : i == 1 ? "bg-300" : "bg-400"
                      }`}
                    ></div>
                  </div>

                  <div className="grid gap-3 sm:gap-2">
                    {nav.items.map((item) => (
                      <Link key={item.path} to={item.path}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-5 sm:flex-row sm:gap-5">
        <div className="font-medium text-[0.9rem]">
          <p>
            e-Tiangge Portal <span>&copy;</span> 2024.
          </p>
          <p>All Rights Reserved.</p>
        </div>

        <img src={department} />

        <img src={footerLogo} />
      </div>
    </>
  );
}

export default Footer;
