import { Link } from "react-router";

function SellerNav() {
  return (
    <div className="bg-100 py-2">
      <p className="text-center text-[0.8rem] text-white">
        Become a Seller?
        <Link className="font-semibold ml-2" to={"/register"}>
          Register Now
        </Link>
      </p>
    </div>
  );
}

export default SellerNav;
