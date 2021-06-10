import AnswersPage from "../AnswersPage";
import BlockDetail from "../BlockDetail";
import QuestionDetail from "../QuestionDetail";
import BlocksPage from "../BlocksPage";
import QuestionsPageContainer from "../QuestionsPage";
import { PageMetods } from "../types";
import { AdmPage, paths } from "./constants";
import { TypeAdmRoute } from "./type";

export function getAdmRoutes(): TypeAdmRoute[] {
  return [
    {
      type: AdmPage.BLOCKS,
      path: paths[AdmPage.BLOCKS],
      component: <BlocksPage />,
      exact: true,
    },
    {
      type: AdmPage.BLOCKS_CREATE,
      path: paths[AdmPage.BLOCKS_CREATE],
      component: <BlockDetail method={PageMetods.CREATE} />,
      exact: true,
    },
    {
      type: AdmPage.BLOCKS_ROUTE,
      path: paths[AdmPage.BLOCKS_ROUTE],
      component: <BlockDetail method={PageMetods.UPDATE} />,
    },
    {
      type: AdmPage.QUESTIONS,
      path: paths[AdmPage.QUESTIONS],
      component: <QuestionsPageContainer />,
      exact: true,
    },
    {
      type: AdmPage.QUESTIONS_CREATE,
      path: paths[AdmPage.QUESTIONS_CREATE],
      component: <QuestionDetail method={PageMetods.CREATE} />,
      exact: true,
    },
    {
      type: AdmPage.QUESTIONS_ROUTE,
      path: paths[AdmPage.QUESTIONS_ROUTE],
      component: <QuestionDetail method={PageMetods.UPDATE} />,
    },
    {
      type: AdmPage.ANSWERS,
      path: paths[AdmPage.ANSWERS],
      component: <AnswersPage />,
    },
  ];
}
