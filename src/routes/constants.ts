export enum Page {
  HOME = "HOME",
  QUIZE = "QUIZE",
  QUIZE_ROUTE = "QUIZE_ROUTE",
  COMPLETE = "COMPLETE",
  ADMIN = "ADMIN",
}

export const paths = {
  [Page.HOME]: "/",
  [Page.QUIZE]: "/quize",
  [Page.QUIZE_ROUTE]: "/quize/:questionNumber",
  [Page.COMPLETE]: "/complete",
  [Page.ADMIN]: "/admin",
};
