export enum Page {
  HOME = "HOME",
  QUIZE = "QUIZE",
  COMPLETE = "COMPLETE",
  ADMIN = "ADMIN",
  STYLIST = "STYLIST",
  USER = "USER",
  LOGIN = "LOGIN",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export const paths = {
  [Page.HOME]: "/",
  [Page.QUIZE]: "/quize",
  [Page.ADMIN]: "/admin",
  [Page.STYLIST]: "/stylist",
  [Page.USER]: "/user",
  [Page.LOGIN]: "/login",
  [Page.RESET_PASSWORD]: "/reset-password",
};

