import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { LandingPage } from "./pages/auth/LandingPage";
import { Error404 } from "./pages/pageNotFound/ErrorPage";
import EmployeeView from "./pages/admin/employeeManagement/EmployeeView";
import authService from "./services/auth.service";
import UnauthorizedAccessErrorPage from "./pages/pageNotFound/UnauthorizedAccessErrorPage";
import MainHome from "./pages/MainHome";

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
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
