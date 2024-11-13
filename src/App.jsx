import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { LandingPage } from "./pages/auth/LandingPage";
import EmployeeOnboarding from "./pages/admin/employeeManagement/EmployeeOnboarding";
import EmployeeView from "./pages/admin/employeeManagement/EmployeeView";
import authService from "./services/auth.service";
import MainHome from "./pages/MainHome";
import { Error404 } from "./pages/page_not_found/ErrorPage";
import UnauthorizedAccessErrorPage from "./pages/page_not_found/UnauthorizedAccessErrorPage";

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
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <EmployeeView />
      },
      {
        path: "/admin/onboarding",
        element: authService.getUserRole() !== 'ADMIN' ? <UnauthorizedAccessErrorPage /> : <EmployeeOnboarding />
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
