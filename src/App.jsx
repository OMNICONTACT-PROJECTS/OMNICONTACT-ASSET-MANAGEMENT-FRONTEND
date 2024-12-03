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
import UserProfile, { userProfileLoader } from "./pages/admin/employeeManagement/UserProfile";

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
      {
        path: "/admin/employees",
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <UsersTab />,
        loader: AllEmployeesViewLoader
      },
      {
        path: "/admin/departments",
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <Departments />,
        loader: AllDepartmentsViewLoader
      },
      {
        path: "/admin/onboarding",
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <EmployeeOnboarding />
      },
      {
        path: "/admin/employees/:id/details",
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <EmployeePage />,
        loader: EmployeePageLoader
      },
      {
        path: "/admin/profile",
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <UserProfile />,
        loader: userProfileLoader
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
