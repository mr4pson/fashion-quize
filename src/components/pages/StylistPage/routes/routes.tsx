import { TStylistPage } from "common/types/types";
import CompilationDetail from "../CompilationDetail";
import CompilationsPageContainer from "../CompilationsPage/CompilationsPageContainer";
import TaskDetailPage from "../TaskDetail";
import TasksPageContainer from "../TasksPage/TasksPageContainer";
import { PageMethods } from "../types";
import UsersPageContainer from "../UsersPage/UsersPageContainer";
import UserDetail from "../UserDetail/UserDetail";
import { paths, StlPage } from "./consts";
import QuizePage from "../QuizePage";

export function getStylistRoutes(): TStylistPage[] {
  return [
    {
      type: StlPage.BASE,
      path: paths[StlPage.BASE],
      component: <div></div>,
      exact: true,
    },
    {
      type: StlPage.TASKS,
      path: paths[StlPage.TASKS],
      component: <TasksPageContainer />,
      exact: true,
    },
    {
      type: StlPage.COMPILATIONS,
      path: paths[StlPage.COMPILATIONS],
      component: <CompilationsPageContainer />,
      exact: true,
    },
    {
      type: StlPage.TASKS_EDIT,
      path: paths[StlPage.TASKS_EDIT],
      component: <TaskDetailPage />,
    },
    {
      type: StlPage.USERS,
      path: paths[StlPage.USERS],
      component: <UsersPageContainer />,
      exact: true,
    },
    {
      type: StlPage.USERS_DETAIL,
      path: paths[StlPage.USERS_DETAIL],
      component: <UserDetail />,
    },
    {
      type: StlPage.QUIZE,
      path: paths[StlPage.QUIZE],
      component: <QuizePage />,
    },
    {
      type: StlPage.COMPILATIONS_EDIT,
      path: paths[StlPage.COMPILATIONS_EDIT],
      component: <CompilationDetail method={PageMethods.UPDATE} />,
      exact: true,
    },
    {
      type: StlPage.COMPILATIONS_CREATE,
      path: paths[StlPage.COMPILATIONS_CREATE],
      component: <CompilationDetail method={PageMethods.CREATE} />,
    },
  ];
}
