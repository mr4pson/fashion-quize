// import { PageMethods } from "../types";
import CompilationsPageContainer from "../CompilationsPage/CompilationsPageContainer";
import TasksPage from "../TasksPage";
import { paths, StlPage } from "./consts";
import { IStylistPage } from "./types";

export function getStylistRoutes(): IStylistPage[] {
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
      component: <TasksPage />,
      exact: true,
    },
    {
      type: StlPage.COMPILATIONS,
      path: paths[StlPage.COMPILATIONS],
      component: <CompilationsPageContainer />,
      exact: true,
    },
  ];
}
