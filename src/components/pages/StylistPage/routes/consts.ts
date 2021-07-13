export enum StlPage {
  BASE = "BASE",
  TASKS = "TASKS",
  COMPILATIONS = "COMPILATIONS",
}

export const ID = ":id";

export const paths = {
  [StlPage.BASE]: "/stylist",
  [StlPage.TASKS]: "/stylist/tasks",
  [StlPage.COMPILATIONS]: "/stylist/compilations",
};
