import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { ErrorPage, LoginPage, DashboardPage } from "@pages/index";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
]);

export default AppRouter;
