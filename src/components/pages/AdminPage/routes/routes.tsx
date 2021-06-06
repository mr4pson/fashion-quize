import React from "react";
import AnswersPage from "../AnswersPage";
import BlocksPage from "../BlocksPage";
import QuestionsPage from "../QuestionsPage";
import { AdmPage, paths } from "./constants";
import { TypeAdmRoute } from "./type";

export function getAdmRoutes(): TypeAdmRoute[] {
  return [
    {
      type: AdmPage.BLOCKS,
      path: paths[AdmPage.BLOCKS],
      component: <BlocksPage />,
    },
    {
      type: AdmPage.QUESTIONS,
      path: paths[AdmPage.QUESTIONS],
      component: <QuestionsPage />,
    },
    {
      type: AdmPage.ANSWERS,
      path: paths[AdmPage.ANSWERS],
      component: <AnswersPage />,
    },
  ];
}
