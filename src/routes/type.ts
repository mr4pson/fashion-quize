import { Page } from "./constants";

export type TypeAppRoute = {
  type: Page;
  path: string;
  exact?: boolean;
  component: JSX.Element;
};
