export enum StylistPage {
  BASE = "BASE",
  TASKS = "TASKS",
  TASKS_EDIT = "TASKS_EDIT",
}

export const ID = ":id";

export const paths = {
  [StylistPage.BASE]: "/stylist",
  [StylistPage.TASKS]: "/stylist/tasks",
  [StylistPage.TASKS_EDIT]: `/stylist/tasks/${ID}`,
};
