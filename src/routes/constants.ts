export enum Page {
  HOME = "HOME",
  QUIZE = "QUIZE",
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

export const paths = {
  [Page.HOME]: "/",
  [Page.QUIZE]: "/quize",
  [Page.NAME_INPUT]: "/name-input",
  [Page.EMAIL_INPUT]: "/email-input",
  [Page.AGE_INPUT]: "/age-input",
  [Page.CITY_INPUT]: "/city-input",
  [Page.COMPLETE]: "/complete",
  [Page.ADMIN]: "/admin",
  [Page.STYLIST]: "/stylist",
  [Page.USER]: "/user",
  [Page.LOGIN]: "/login",
  [Page.RESET_PASSWORD]: "/reset-password",
};
