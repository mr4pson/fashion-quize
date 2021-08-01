import { IStylistPage } from "common/types/type";
import CompilationDetail from "../CompilationDetail";
import CompilationsPageContainer from "../CompilationsPage/CompilationsPageContainer";
import TaskDetailPage from "../TaskDetailPage";
import TasksPageContainer from "../TasksPage/TasksPageContainer";
import { PageMethods } from "../types";
import { paths, StlPage } from "./consts";

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
