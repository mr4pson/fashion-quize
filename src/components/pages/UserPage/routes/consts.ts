export enum UsrPage {
  BASE = "BASE",
  PROFILE = "PROFILE",
  TASKS = "TASKS",
  TASKS_CREATE = "TASKS_CREATE",
  COMPILATIONS = "COMPILATIONS",
}

export const ID = ":id";

export const paths = {
  [UsrPage.BASE]: "/user",
  [UsrPage.PROFILE]: "/user/profile",
  [UsrPage.TASKS]: "/user/tasks",
  [UsrPage.TASKS_CREATE]: "/user/tasks/create",
  [UsrPage.COMPILATIONS]: "/user/compilations",
};
