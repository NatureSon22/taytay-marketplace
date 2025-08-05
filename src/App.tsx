import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/landingpage/LandingPage";
import AboutPage from "./pages/aboutpage/AboutPage";
import ContactUs from "./pages/contact-us/ContactUs";
import Privacy from "./pages/compliance/Privacy";
import TermsOfUse from "./pages/compliance/TermsOfUse";
import Register from "./pages/auth/registartion/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StorePage from "./pages/store/StorePage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import StoreDetails from "./pages/store/StoreDetails";
import AccountWrapper from "./pages/account/AccountWrapper";
import ManageAccount from "./pages/account/ManageAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // auth
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      // products
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product",
        element: <ProductDetailsPage />,
      },
      // store
      {
        path: "/stores",
        element: <StorePage />,
      },
      {
        path: "/store",
        element: <StoreDetails />,
      },
      //
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsOfUse />,
      },
      // account
      {
        path: "/account",
        element: <AccountWrapper />,

        children: [
          { path: "/account/manage",  element: <ManageAccount /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
