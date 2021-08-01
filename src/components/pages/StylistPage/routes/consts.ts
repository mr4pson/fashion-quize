export enum StlPage {
  BASE = "BASE",
  TASKS = "TASKS",
  TASKS_EDIT = "TASKS_EDIT",
  COMPILATIONS = "COMPILATIONS",
  COMPILATIONS_EDIT = "COMPILATIONS_EDIT",
  COMPILATIONS_CREATE = "COMPILATIONS_CREATE",
}

export const ID = ":id";
export const TASK_ID = ":taskId";

export const paths = {
  [StlPage.BASE]: "/stylist",
  [StlPage.TASKS]: "/stylist/tasks",
  [StlPage.TASKS_EDIT]: `/stylist/tasks/${ID}`,
  [StlPage.COMPILATIONS]: "/stylist/compilations",
  [StlPage.COMPILATIONS_EDIT]: `/stylist/compilations/${ID}`,
  [StlPage.COMPILATIONS_CREATE]: `/stylist/compilations/create/${TASK_ID}`,
};
