export enum QzPage {
  EMPTY = "EMPTY",
  BASE = "BASE",
  SEX = "SEX",
  ROUTE = "ROUTE",
  COMPLETE = "COMPLETE"
}

export const QUIZE_TYPE = ":quizeType";
export const SECTION_NUMBER = ":sectionNumber";

export const paths = {
  [QzPage.EMPTY]: "/quize",
  [QzPage.BASE]: "/quize/base",
  [QzPage.SEX]: "/quize/sex",
  [QzPage.COMPLETE]: "/quize/complete",
  [QzPage.ROUTE]: `/quize/${QUIZE_TYPE}/${SECTION_NUMBER}`,
};
