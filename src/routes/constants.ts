export enum Page {
  HOME = "HOME",
  QUIZE = "QUIZE",
  QUIZE_SEX = "QUIZE_SEX",
  QUIZE_ROUTE = "QUIZE_ROUTE",
  COMPLETE = "COMPLETE",
  ADMIN = "ADMIN",
  STYLIST = "STYLIST",
  USER = "USER",
  LOGIN = "LOGIN",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_INPUT = "EMAIL_INPUT",
  NAME_INPUT = "NAME_INPUT",
  AGE_INPUT = "AGE_INPUT",
  CITY_INPUT = "CITY_INPUT",
}

export const QUIZE_TYPE = ":quizeType";
export const QUESTION_NUMBER = ":questionNumber";

export const paths = {
  [Page.HOME]: "/",
  [Page.QUIZE]: "/quize",
  [Page.QUIZE_SEX]: "/sex-selection",
  [Page.NAME_INPUT]: "/name-input",
  [Page.EMAIL_INPUT]: "/email-input",
  [Page.AGE_INPUT]: "/age-input",
  [Page.CITY_INPUT]: "/city-input",
  [Page.QUIZE_ROUTE]: `/quize/${QUIZE_TYPE}/${QUESTION_NUMBER}`,
  [Page.COMPLETE]: "/complete",
  [Page.ADMIN]: "/admin",
  [Page.STYLIST]: "/stylist",
  [Page.USER]: "/user",
  [Page.LOGIN]: "/login",
  [Page.RESET_PASSWORD]: "/reset-password",
};
