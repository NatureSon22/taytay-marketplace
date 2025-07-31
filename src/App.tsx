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
import AdminLayout from "./pages/admindashboard/AdminLayout";
import DashboardPage from "./pages/admindashboard/DashboardPage";
import UsersPage from "./pages/admindashboard/UsersPage";
import ReportsPage from "./pages/admindashboard/ReportsPage";
import SettingsPage from "./pages/admindashboard/SettingsPage";

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
        path: "/stores",
        element: <StorePage />,
      },
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
    ],
  },
  {
  path: "/admin",
  element: <AdminLayout />, 
  children: [
  {
      path: "/admin/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/admin/users",
      element: <UsersPage />,
    },
    {
      path: "/admin/reports",
      element: <ReportsPage />,
    },
    {
      path: "/admin/settings",
      element: <SettingsPage />,
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
