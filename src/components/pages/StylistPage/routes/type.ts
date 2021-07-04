import { StylistPage } from "./constants";

export type TypeAdmRoute = {
  type: StylistPage;
  path: string;
  exact?: boolean;
  component: JSX.Element;
};
