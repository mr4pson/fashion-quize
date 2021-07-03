export enum AdmPage {
  BASE = "BASE",
  BLOCKS = "BLOCKS",
  BLOCKS_CREATE = "BLOCKS_CREATE",
  BLOCKS_ROUTE = "BLOCKS_ROUTE",
  QUESTIONS_CREATE = "QUESTIONS_CREATE",
  QUESTIONS_ROUTE = "QUESTIONS_ROUTE",
  QUESTIONS = "QUESTIONS",
  QUESTIONS_TYPE = "QUESTIONS_TYPE",
  STYLISTS = "STYLISTS",
  ANSWERS = "ANSWERS",
}

export const QUIZE_TYPE = ":quizeType";
export const ID = ":id";

export const paths = {
  [AdmPage.BASE]: "/admin",
  [AdmPage.BLOCKS]: "/admin/blocks",
  [AdmPage.BLOCKS_CREATE]: "/admin/blocks/create",
  [AdmPage.BLOCKS_ROUTE]: "/admin/blocks/edit/:id",
  [AdmPage.QUESTIONS]: "/admin/questions",
  [AdmPage.QUESTIONS_TYPE]: "/admin/questions/:quizeType",
  [AdmPage.QUESTIONS_CREATE]: `/admin/questions/${QUIZE_TYPE}/create`,
  [AdmPage.QUESTIONS_ROUTE]: `/admin/questions/${QUIZE_TYPE}/edit/:id`,
  [AdmPage.STYLISTS]: "/admin/stylists",
  [AdmPage.ANSWERS]: "/admin/answers",
};
