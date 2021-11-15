import AdminPage from "components/pages/AdminPage";
import CompletePageContainer from "components/pages/CompletePage/CompletePageContainer";
import HomePage from "components/pages/HomePage";
import LoginPage from "components/pages/LoginPage/LoginPage";
import QuizePageContainer from "components/pages/QuizePage/QuizePageContainer";
import ResetPasswordPage from "components/pages/ResetPasswordPage/ResetPasswordPage";
import StylistPage from "components/pages/StylistPage";
import UserPage from "components/pages/UserPage";
import { Page, paths } from "./constants";
import { TypeAppRoute } from "./type";

export function getAppRoutes(): TypeAppRoute[] {
  return [
    {
      type: Page.HOME,
      path: paths[Page.HOME],
      component: <HomePage />,
      exact: true,
    },
    {
      type: Page.QUIZE,
      path: paths[Page.QUIZE],
      component: <QuizePageContainer />,
    },
    {
      type: Page.COMPLETE,
      path: paths[Page.COMPLETE],
      component: <CompletePageContainer />,
    },
    {
      type: Page.ADMIN,
      path: paths[Page.ADMIN],
      component: <AdminPage />,
    },
    {
      type: Page.STYLIST,
      path: paths[Page.STYLIST],
      component: <StylistPage />,
    },
    {
      type: Page.USER,
      path: paths[Page.USER],
      component: <UserPage />,
    },
    {
      type: Page.LOGIN,
      path: paths[Page.LOGIN],
      component: <LoginPage />,
    },
    {
      type: Page.RESET_PASSWORD,
      path: paths[Page.RESET_PASSWORD],
      component: <ResetPasswordPage />,
    },
  ];
}
