// import { PageMethods } from "../types";
import TasksPage from "../TasksPage";
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
      component: <TasksPage/>,
      exact: true,
    },
  ];
}
