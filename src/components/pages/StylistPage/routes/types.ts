import { StlPage } from "./consts";

export interface IStylistPage {
  type: StlPage;
  path: string;
  exact?: boolean;
  component: JSX.Element;
}
