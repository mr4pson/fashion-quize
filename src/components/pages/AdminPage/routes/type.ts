import { AdmPage } from "./constants";

export type TypeAdmRoute = {
  type: AdmPage;
  path: string;
  exact?: boolean;
  component: JSX.Element;
};
