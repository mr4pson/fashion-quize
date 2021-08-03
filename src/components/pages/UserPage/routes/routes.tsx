import { TStylistPage } from "common/types/types";
import CompilationsPageContainer from "../CompilationsPage";
import ProfilePage from "../ProfilePage";
import { TaskCreationPage } from "../TaskCreationPage/TaskCreationPage";
import TasksPageContainer from "../TasksPage/TasksPageContainer";
import { paths, UsrPage } from "./consts";

export function getUserRoutes(): TStylistPage[] {
  return [
    {
      type: UsrPage.BASE,
      path: paths[UsrPage.BASE],
      component: <div></div>,
      exact: true,
    },
    {
      type: UsrPage.PROFILE,
      path: paths[UsrPage.PROFILE],
      component: <ProfilePage />,
      exact: true,
    },
    {
      type: UsrPage.TASKS,
      path: paths[UsrPage.TASKS],
      component: <TasksPageContainer />,
      exact: true,
    },
    {
      type: UsrPage.TASKS_CREATE,
      path: paths[UsrPage.TASKS_CREATE],
      component: <TaskCreationPage />,
      exact: true,
    },
    {
      type: UsrPage.COMPILATIONS,
      path: paths[UsrPage.COMPILATIONS],
      component: <CompilationsPageContainer />,
      exact: true,
    },
  ];
}
