export enum AdmPage {
  BASE = "BASE",
  BLOCKS = "BLOCKS",
  BLOCKS_CREATE = "BLOCKS_CREATE",
  BLOCKS_EDIT = "BLOCKS_EDIT",
  QUESTIONS_CREATE = "QUESTIONS_CREATE",
  QUESTIONS_ROUTE = "QUESTIONS_ROUTE",
  QUESTIONS = "QUESTIONS",
  QUESTIONS_TYPE = "QUESTIONS_TYPE",
  STYLISTS = "STYLISTS",
  STYLISTS_CREATE = "STYLISTS_CREATE",
  STYLISTS_EDIT = "STYLISTS_EDIT",
  ANSWERS = "ANSWERS",
  USERS = "USERS",
  USERS_DETAIL = "USERS_DETAIL",
}

export const QUIZE_TYPE = ":quizeType";
export const ID = ":id";

export const paths = {
  [AdmPage.BASE]: "/admin",
  [AdmPage.BLOCKS]: "/admin/blocks",
  [AdmPage.BLOCKS_CREATE]: "/admin/blocks/create",
  [AdmPage.BLOCKS_EDIT]: `/admin/blocks/edit/${ID}`,
  [AdmPage.QUESTIONS]: "/admin/questions",
  [AdmPage.QUESTIONS_TYPE]: `/admin/questions/${QUIZE_TYPE}`,
  [AdmPage.QUESTIONS_CREATE]: `/admin/questions/${QUIZE_TYPE}/create`,
  [AdmPage.QUESTIONS_ROUTE]: `/admin/questions/${QUIZE_TYPE}/edit/${ID}`,
  [AdmPage.STYLISTS]: "/admin/stylists",
  [AdmPage.STYLISTS_CREATE]: `/admin/stylists/create`,
  [AdmPage.STYLISTS_EDIT]: `/admin/stylists/edit/${ID}`,
  [AdmPage.ANSWERS]: "/admin/answers",
  [AdmPage.USERS]: "/admin/users",
  [AdmPage.USERS_DETAIL]: `/admin/users/${ID}`
};
