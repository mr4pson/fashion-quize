import AdminPage from "components/pages/AdminPage";
import CompletePageContainer from "components/pages/CompletePage/CompletePageContainer";
import HomePage from "components/pages/HomePage";
import LoginPage from "components/pages/LoginPage/LoginPage";
import QuizePageContainer from "components/pages/QuizePage/QuizePageContainer";
import SexPage from "components/pages/QuizePage/SexPage/SexPage";
import FieldPage from "components/pages/QuizePage/FieldPage/FieldPage";
import ResetPasswordPage from "components/pages/ResetPasswordPage/ResetPasswordPage";
import StylistPage from "components/pages/StylistPage";
import UserPage from "components/pages/UserPage";
import { Page, paths } from "./constants";
import { TypeAppRoute } from "./type";
import { quizeThunks } from "redux/slicers/quizePageSlice";

export function getAppRoutes(): TypeAppRoute[] {
  return [
    {
      type: Page.HOME,
      path: paths[Page.HOME],
      component: <HomePage />,
      exact: true,
    },
    {
      type: Page.QUIZE_SEX,
      path: paths[Page.QUIZE_SEX],
      component: <SexPage />,
      exact: true,
    },
    {
      type: Page.NAME_INPUT,
      path: paths[Page.NAME_INPUT],
      component: <FieldPage next={Page.EMAIL_INPUT} type={'text'} thunk={quizeThunks.setName} title={'Введите ваше имя'}/>,
      exact: true,
    },
    {
      type: Page.EMAIL_INPUT,
      path: paths[Page.EMAIL_INPUT],
      component: <FieldPage next={Page.AGE_INPUT} type={'email'} thunk={quizeThunks.setEmail} title={'Введите ваш email'}/>,
      exact: true,
    },
    {
      type: Page.AGE_INPUT,
      path: paths[Page.AGE_INPUT],
      component: <FieldPage next={Page.CITY_INPUT} type={'number'} thunk={quizeThunks.setAge} title={'Введите ваш возраст'}/>,
      exact: true,
    },
    {
      type: Page.CITY_INPUT,
      path: paths[Page.CITY_INPUT],
      component: <FieldPage next={Page.QUIZE_SEX} type={'text'} thunk={quizeThunks.setCity} title={'Введите ваш город'}/>,
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
