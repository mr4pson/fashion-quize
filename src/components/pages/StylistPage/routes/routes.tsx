// import { PageMethods } from "../types";
import TaskDetailPage from "../TaskDetailPage";
import TasksPageContainer from "../TasksPage/TasksPageContainer";
import { paths, StylistPage } from "./constants";
import { TypeAdmRoute } from "./type";

export function getStylistRoutes(): TypeAdmRoute[] {
  return [
    {
      type: StylistPage.BASE,
      path: paths[StylistPage.BASE],
      component: <div></div>,
      exact: true,
    },
    {
      type: StylistPage.TASKS,
      path: paths[StylistPage.TASKS],
      component: <TasksPageContainer/>,
      exact: true,
    },
    {
      type: StylistPage.TASKS_EDIT,
      path: paths[StylistPage.TASKS_EDIT],
      component: <TaskDetailPage/>,
    },
  ];
}
