import UserDetail from "components/pages/StylistPage/UserDetail";
import AnswersPage from "../AnswersPage";
import BlockDetail from "../BlockDetail";
import BlocksPage from "../BlocksPage";
import QuestionDetail from "../QuestionDetail";
import QuestionsPageContainer from "../QuestionsPage";
import StylistDetail from "../StylistDetail";
import StylistsPageContainer from "../StylistsPage/StylistsPageContainer";
import { PageMethods } from "../types";
import UsersPageContainer from "../UsersPage/UsersPageContainer";
import { AdmPage, paths } from "./constants";
import { TypeAdmRoute } from "./type";

export function getAdmRoutes(): TypeAdmRoute[] {
  return [
    {
      type: AdmPage.BASE,
      path: paths[AdmPage.BASE],
      component: <div></div>,
      exact: true,
    },
    {
      type: AdmPage.BLOCKS,
      path: paths[AdmPage.BLOCKS],
      component: <BlocksPage />,
      exact: true,
    },
    {
      type: AdmPage.BLOCKS_CREATE,
      path: paths[AdmPage.BLOCKS_CREATE],
      component: <BlockDetail method={PageMethods.CREATE} />,
      exact: true,
    },
    {
      type: AdmPage.BLOCKS_EDIT,
      path: paths[AdmPage.BLOCKS_EDIT],
      component: <BlockDetail method={PageMethods.UPDATE} />,
    },
    {
      type: AdmPage.QUESTIONS_TYPE,
      path: paths[AdmPage.QUESTIONS_TYPE],
      component: <QuestionsPageContainer />,
      exact: true,
    },
    {
      type: AdmPage.QUESTIONS_CREATE,
      path: paths[AdmPage.QUESTIONS_CREATE],
      component: <QuestionDetail method={PageMethods.CREATE} />,
      exact: true,
    },
    {
      type: AdmPage.QUESTIONS_ROUTE,
      path: paths[AdmPage.QUESTIONS_ROUTE],
      component: <QuestionDetail method={PageMethods.UPDATE} />,
    },
    {
      type: AdmPage.STYLISTS,
      path: paths[AdmPage.STYLISTS],
      component: <StylistsPageContainer />,
      exact: true,
    },
    {
      type: AdmPage.STYLISTS_CREATE,
      path: paths[AdmPage.STYLISTS_CREATE],
      component: <StylistDetail method={PageMethods.CREATE} />,
      exact: true,
    },
    {
      type: AdmPage.STYLISTS_EDIT,
      path: paths[AdmPage.STYLISTS_EDIT],
      component: <StylistDetail method={PageMethods.UPDATE} />,
    },
    {
      type: AdmPage.ANSWERS,
      path: paths[AdmPage.ANSWERS],
      component: <AnswersPage />,
    },
    {
      type: AdmPage.USERS,
      path: paths[AdmPage.USERS],
      component: <UsersPageContainer />,
      exact: true,
    },
    {
      type: AdmPage.USERS_DETAIL,
      path: paths[AdmPage.USERS_DETAIL],
      component: <UserDetail />,
    },
  ];
}
