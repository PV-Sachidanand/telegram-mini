import { createBrowserRouter } from "react-router-dom";
import App from "./app/App";
import HomePage from "./pages/home";
import StartPage from "./pages/start";
import { userSession } from "./lib/auth";
import ErrorPage from "./pages/error";
import ReferralPage from "./pages/referel";

export const getRoutes = async () => {
  const { status: isLoggedIn } = userSession();
  const publicPage = [
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/referral",
      element: <ReferralPage />,
    },
  ];
  const privatPage = [
    {
      path: "/",
      element: <HomePage />,
    },
  ];
  return isLoggedIn ? privatPage : publicPage;
};

const loadRoutes = async () => {
  const routes = await getRoutes();
  return [
    {
      element: <App />,
      errorElement: <ErrorPage />,
      children: routes,
    },
  ];
};

const router = createBrowserRouter(await loadRoutes());

export { router };
