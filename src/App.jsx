import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { LandingPage } from "./pages/auth/LandingPage";
import EmployeeOnboarding from "./pages/admin/employeeManagement/EmployeeOnboarding";
import Departments from "./pages/admin/departments/Departments";
import authService from "./services/auth.service";
import MainHome from "./pages/MainHome";
import { Error404 } from "./pages/page_not_found/ErrorPage";
import UnauthorizedAccessErrorPage from "./pages/page_not_found/UnauthorizedAccessErrorPage";
import UsersTab from "./pages/admin/employeeManagement/UsersTab";
import { AllEmployeesViewLoader } from "./pages/admin/employeeManagement/AllEmployeesView";
import { AllDepartmentsViewLoader } from "./pages/admin/departments/Departments";
import EmployeePage, { EmployeePageLoader } from "./pages/admin/employeeManagement/EmployeePage";
import UserProfile, { UserProfileLoader } from "./pages/admin/employeeManagement/UserProfile";
import AssetCategoryList, { AssetCategoryLoader } from "./pages/admin/assetManagement/assetCategory/AssetCategoryList";
import AssetItemsList, { AssetItemsLoader } from "./pages/admin/assetManagement/assetItems/AssetItemsList";
import AssetList, { AssetLoader } from "./pages/admin/assetManagement/assets/AssetList";
import AssetRequestList, { AssetRequestListLoader } from "./pages/admin/assetManagement/assetRequest/AssetRequestList";
import MyAssetRequestList, { MyAssetRequestListLoader } from "./pages/admin/assetManagement/myAssetRequest/MyAssetRequestList";
import MyAssetAllocationList, { MyAssetAllocationListLoader } from "./pages/admin/assetManagement/myAssetAllocation/MyAssetAllocationList";
import AssetAllocationList, { AssetAllocationListLoader } from "./pages/admin/assetManagement/assetAllocation/assetAllocationList";
import UserAssetCategoryList, { UserAssetCategoryLoader } from "./pages/general_employee/assetManagement/assetCategory/UserAssetCategoryList";
import UserAssetItemsList, { UserAssetItemsLoader } from "./pages/general_employee/assetManagement/assetItems/UserAssetItemsList";
import UserAssetList, { UserAssetLoader } from "./pages/general_employee/assetManagement/assets/UserAssetList";
import UserAssetAllocationList, { UserAssetAllocationListLoader } from "./pages/general_employee/assetManagement/myAssetAllocation/UserAssetAllocationList";
import UserAssetRequestList, { UserAssetRequestListLoader } from "./pages/general_employee/assetManagement/myAssetRequest/UserAssetRequestList";
import GeneralUserProfile, { GeneralUserProfileLoader } from "./pages/general_employee/GeneralUserProfile";

const router = createBrowserRouter([
  {
    path: "/landing-page",
    errorElement: <Error404 />,
    element: <LandingPage />
  },
  {
    path: "/login",
    errorElement: <Error404 />,
    element: <LoginPage />
  },
  {
    path: "/",
    errorElement: <UnauthorizedAccessErrorPage />,
    element: <Main />,
    children: [
      {
        path: "/",
        index: true,
        element: <MainHome />
      },

      // ADMIN AND IS_SUPPORT ROUTES
      {
        path: "/admin/employees",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <UsersTab />,
        loader: AllEmployeesViewLoader
      },
      {
        path: "/admin/departments",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <Departments />,
        loader: AllDepartmentsViewLoader
      },
      {
        path: "/admin/onboarding",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <EmployeeOnboarding />
      },
      {
        path: "/admin/employees/:id/details",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <EmployeePage />,
        loader: EmployeePageLoader
      },
      {
        path: "/admin/profile",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <UserProfile />,
        loader: UserProfileLoader
      },
      {
        path: "/admin/asset-categories",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <AssetCategoryList />,
        loader: AssetCategoryLoader
      },
      {
        path: "/admin/asset-category/:id/asset-items",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <AssetItemsList />,
        loader: AssetItemsLoader
      },
      {
        path: "/admin/assets",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <AssetList />,
        loader: AssetLoader
      },
      {
        path: "/admin/asset-request",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <AssetRequestList />,
        loader: AssetRequestListLoader
      },
      {
        path: "/admin/asset-allocations",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <AssetAllocationList />,
        loader: AssetAllocationListLoader
      },
      {
        path: "/admin/my-asset-requests",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <MyAssetRequestList />,
        loader: MyAssetRequestListLoader
      },
      {
        path: "/admin/my-asset-allocation",
        element: authService.getUserRole() !== 'ADMIN' && authService.getUserRole() !== 'IS_SUPPORT' ? <UnauthorizedAccessErrorPage /> : <MyAssetAllocationList />,
        loader: MyAssetAllocationListLoader
      },


      // GENERAL USERS ROUTES

      {
        path: "/user/asset-categories",
        element: authService.getUserRole() !== 'USER' ? <UnauthorizedAccessErrorPage /> : <UserAssetCategoryList />,
        loader: UserAssetCategoryLoader
      },
      {
        path: "/user/asset-category/:id/asset-items",
        element: authService.getUserRole() !== 'USER' ? <UnauthorizedAccessErrorPage /> : <UserAssetItemsList />,
        loader: UserAssetItemsLoader
      },
      {
        path: "/user/all-assets",
        element: authService.getUserRole() !== 'USER' ? <UnauthorizedAccessErrorPage /> : <UserAssetList />,
        loader: UserAssetLoader
      },
      {
        path: "/user/asset-allocation",
        element: authService.getUserRole() !== 'USER' ? <UnauthorizedAccessErrorPage /> : <UserAssetAllocationList />,
        loader: UserAssetAllocationListLoader
      },
      {
        path: "/user/asset-request",
        element: authService.getUserRole() !== 'USER' ? <UnauthorizedAccessErrorPage /> : <UserAssetRequestList />,
        loader: UserAssetRequestListLoader
      },
      {
        path: "/user/profile",
        element: authService.getUserRole() !== 'USER' ? <UnauthorizedAccessErrorPage /> : <GeneralUserProfile />,
        loader: GeneralUserProfileLoader
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
