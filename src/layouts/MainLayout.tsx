import BreadCrumbNav from "@/components/BreadCrumbNav";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SellerNav from "@/components/RegisterNav";
import ScrollUpButton from "@/components/ScrollUpButton";
import { useBreadCrumbStore } from "@/states/breadCrumbStore";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

function MainLayout() {
  const location = useLocation();
  const setPath = useBreadCrumbStore((state) => state.setPath);

  useEffect(() => {}, []);

  return (
    <main className="min-h-screen flex flex-col">
      {location.pathname !== "/register" && (
        <>
          <SellerNav />
          <NavBar />
        </>
      )}

      <div className="flex-1 flex flex-col">
        <BreadCrumbNav />
        <Outlet />
      </div>
      <ScrollUpButton />
      <Footer />
    </main>
  );
}

export default MainLayout;
