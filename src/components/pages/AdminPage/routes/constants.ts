export enum AdmPage {
  BLOCKS = "BLOCKS",
  BLOCKS_CREATE = "BLOCKS_CREATE",
  BLOCKS_ROUTE = "BLOCKS_ROUTE",
  QUESTIONS = "QUESTIONS",
  ANSWERS = "ANSWERS",
}

export const paths = {
  [AdmPage.BLOCKS]: "/admin/blocks",
  [AdmPage.BLOCKS_CREATE]: "/admin/blocks/create",
  [AdmPage.BLOCKS_ROUTE]: "/admin/blocks/edit/:id",
  [AdmPage.QUESTIONS]: "/admin/questions",
  [AdmPage.ANSWERS]: "/admin/answers",
};
