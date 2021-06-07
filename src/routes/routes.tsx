import AdminPage from "components/pages/AdminPage";
import CompletePageContainer from "components/pages/CompletePage/CompletePageContainer";
import HomePage from "components/pages/HomePage";
import QuizePageContainer from "components/pages/QuizePage/QuizePageContainer";
import React from "react";
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
      type: Page.QUIZE_ROUTE,
      path: paths[Page.QUIZE_ROUTE],
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
  ];
}
