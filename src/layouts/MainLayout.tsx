import BreadCrumbNav from "@/components/BreadCrumbNav";
import Footer from "@/components/Footer";
import Authenticated from "@/components/layer/Authenticated";
import NavBar from "@/components/NavBar";
import SellerNav from "@/components/RegisterNav";
import ScrollUpButton from "@/components/ScrollUpButton";
import { useBreadCrumbStore } from "@/states/breadCrumbStore";
import { Outlet, useLocation } from "react-router";

function MainLayout() {
  const location = useLocation();
  const setPath = useBreadCrumbStore((state) => state.setPath);

  return (
    <main className="min-h-screen flex flex-col">
      {location.pathname !== "/register" && (
        <>
          <Authenticated renderIfAuthenticated={false}>
            <SellerNav />
          </Authenticated>

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
