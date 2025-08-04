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
import DashboardPage from "./pages/admindashboard/Dashboard/DashboardPage";
import UsersPage from "./pages/admindashboard/Users/UsersPage";
import ReportsPage from "./pages/admindashboard/Reports/ReportsPage";
import SettingsPage from "./pages/admindashboard/Settings/SettingsPage";
import AdminSetting from "./pages/admindashboard/Settings/AdminSetting";
import CategorySetting from "./pages/admindashboard/Settings/CategorySetting";
import GeneralInformationSetting from "./pages/admindashboard/Settings/GeneralInformationSetting";
import BackupRestoreSetting from "./pages/admindashboard/Settings/BackupRestoreSetting";
import AccountInfoSetting from "./pages/admindashboard/Settings/AccountInfoSetting";
import ArchiveSetting from "./pages/admindashboard/Settings/ArchiveSetting";
import TypeSetting from "./pages/admindashboard/Settings/TypeSetting";
import LinkTypeSetting from "./pages/admindashboard/Settings/LinkTypeSetting";

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
      children: [
    { 
      index: true, 
      element: <AdminSetting /> },
    { 
      path: "admin-setting", 
      element: <AdminSetting /> 
    },
    { 
      path: "category-setting", 
      element: <CategorySetting /> 
    },
    { 
      path: "product-type-setting", 
      element: <TypeSetting /> 
    },
    { 
      path: "link-type-setting", 
      element: <LinkTypeSetting /> 
    },
    { 
      path: "general-information-setting", 
      element: <GeneralInformationSetting /> 
    },
    { 
      path: "backup-restore-setting", 
      element: <BackupRestoreSetting /> 
    },
    { 
      path: "account-info-setting", 
      element: <AccountInfoSetting /> 
    },
    { 
      path: "archive-setting", 
      element: <ArchiveSetting /> 
    },
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
