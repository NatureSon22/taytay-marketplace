import BreadCrumbNav from "@/components/BreadCrumbNav";
import Footer from "@/components/Footer";
import Authenticated from "@/components/layer/Authenticated";
import NavBar from "@/components/NavBar";
import SellerNav from "@/components/RegisterNav";
import ScrollUpButton from "@/components/ScrollUpButton";
import { Toaster } from "sonner";
import { Outlet, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";

function MainLayout() {
  useAuth();
  const location = useLocation();
  // const setPath = useBreadCrumbStore((state) => state.setPath);
  const showNav =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <main className="min-h-screen flex flex-col">
      {showNav && (
        <>
          <Authenticated renderIfAuthenticated={false}>
            <SellerNav />
          </Authenticated>

          <NavBar />
        </>
      )}

      <Toaster position="top-right" richColors />

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
