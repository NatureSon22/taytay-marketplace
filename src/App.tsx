import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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
import ManageAccount from "./pages/account/info/ManageAccount";
import AdminLayout from "./pages/admindashboard/AdminLayout";
import DashboardPage from "./pages/admindashboard/Dashboard/DashboardPage";
import UsersPage from "./pages/admindashboard/Users/UsersPage";
import ReportsPage from "./pages/admindashboard/Reports/ReportsPage";
import SettingsPage from "./pages/admindashboard/Settings/SettingsPage";
import AdminSetting from "./pages/admindashboard/Settings/Admin/AdminSetting";
import CategorySetting from "./pages/admindashboard/Settings/Category/CategorySetting";
import OrganizationSetting from "./pages/admindashboard/Settings/Organization/OrganizationSetting";
import GeneralInformationSetting from "./pages/admindashboard/Settings/General/GeneralInformationSetting";
import BackupRestoreSetting from "./pages/admindashboard/Settings/BackupAndRestore/BackupRestoreSetting";
import AccountInfoSetting from "./pages/admindashboard/Settings/Account/AccountInfoSetting";
import ArchiveSetting from "./pages/admindashboard/Settings/Archived/ArchiveSetting";
import TypeSetting from "./pages/admindashboard/Settings/Product/TypeSetting";
import LinkTypeSetting from "./pages/admindashboard/Settings/Link/LinkTypeSetting";
import AuthLayer from "./components/layer/AuthLayer";
import ManageStore from "./pages/account/store/ManageStore";
import CreateProduct from "./pages/account/store/createproduct/CreateProduct";
import Login from "./pages/auth/login/Login";
import StoreInfo from "./pages/account/store/ManageStoreInfo";
import PageNotFound from "./pages/PageNotFound";
import Verification from "./pages/auth/login/Verification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // public routes
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/privacy-policy", element: <Privacy /> },
      { path: "/terms-and-conditions", element: <TermsOfUse /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/verification", element: <Verification /> },

      // products
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <ProductDetailsPage /> },

      // store
      { path: "/stores", element: <StorePage /> },
      { path: "/stores/:id", element: <StoreDetails /> },

      // account routes (protected)
      {
        path: "/account",
        element: (
          <AuthLayer>
            <AccountWrapper />
          </AuthLayer>
        ),
        children: [
          { index: true, element: <Navigate to="/account/manage" replace /> },
          { path: "manage", element: <ManageAccount /> },
          { path: "store", element: <ManageStore /> },
          { path: "store/edit", element: <StoreInfo /> },
          { path: "store/product/new", element: <CreateProduct /> },
          { path: "store/product/edit/:id", element: <CreateProduct /> },
        ],
      },
    ],
  },

  // admin routes (protected)
  {
    path: "/admin",
    element: (
      <AuthLayer>
        <AdminLayout />
      </AuthLayer>
    ),
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "reports", element: <ReportsPage /> },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          { index: true, element: <AdminSetting /> },
          { path: "admin-setting", element: <AdminSetting /> },
          { path: "category-setting", element: <CategorySetting /> },
          { path: "product-type-setting", element: <TypeSetting /> },
          { path: "link-type-setting", element: <LinkTypeSetting /> },
          { path: "organization-setting", element: <OrganizationSetting /> },
          {
            path: "general-information-setting",
            element: <GeneralInformationSetting />,
          },
          { path: "backup-restore-setting", element: <BackupRestoreSetting /> },
          { path: "account-info-setting", element: <AccountInfoSetting /> },
          { path: "archive-setting", element: <ArchiveSetting /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
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
