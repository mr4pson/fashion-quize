export enum Page {
  HOME = "HOME",
  QUIZE = "QUIZE",
  QUIZE_SEX = "QUIZE_SEX",
  QUIZE_ROUTE = "QUIZE_ROUTE",
  COMPLETE = "COMPLETE",
  ADMIN = "ADMIN",
  LOGIN = "LOGIN",
}

export const QUIZE_TYPE = ":quizeType";
export const QUESTION_NUMBER = ":questionNumber";

export const paths = {
  [Page.HOME]: "/",
  [Page.QUIZE]: "/quize",
  [Page.QUIZE_SEX]: "/sex-selection",
  [Page.QUIZE_ROUTE]: `/quize/${QUIZE_TYPE}/${QUESTION_NUMBER}`,
  [Page.COMPLETE]: "/complete",
  [Page.ADMIN]: "/admin",
  [Page.LOGIN]: "/login"
};
