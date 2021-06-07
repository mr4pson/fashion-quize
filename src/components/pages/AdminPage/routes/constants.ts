export enum AdmPage {
  BLOCKS = "BLOCKS",
  BLOCKS_ROUTE = "BLOCKS_ROUTE",
  QUESTIONS = "QUESTIONS",
  ANSWERS = "ANSWERS",
}

export const paths = {
  [AdmPage.BLOCKS]: "/admin/blocks",
  [AdmPage.BLOCKS_ROUTE]: "/admin/blocks/:id",
  [AdmPage.QUESTIONS]: "/admin/questions",
  [AdmPage.ANSWERS]: "/admin/answers",
};
