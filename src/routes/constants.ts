export enum Page {
  HOME = "HOME",
  QUIZE = "QUIZE",
  QUIZEROUTE = "QUIZEROUTE",
  COMPLETE = "COMPLETE",
  ADMIN = "ADMIN",
}

export const paths = {
  [Page.HOME]: "/",
  [Page.QUIZE]: "/quize",
  [Page.QUIZEROUTE]: "/quize/:questionNumber",
  [Page.COMPLETE]: "/complete",
  [Page.ADMIN]: "/admin",
};
