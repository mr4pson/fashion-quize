export enum QzPage {
  EMPTY = "EMPTY",
  BASE = "BASE",
  SEX = "SEX",
  ROUTE = "ROUTE",
}

export const QUIZE_TYPE = ":quizeType";
export const QUESTION_NUMBER = ":questionNumber";

export const paths = {
  [QzPage.EMPTY]: "/quize",
  [QzPage.BASE]: "/quize/base",
  [QzPage.SEX]: "/quize/sex",
  [QzPage.ROUTE]: `/quize/${QUIZE_TYPE}/${QUESTION_NUMBER}`,
};
