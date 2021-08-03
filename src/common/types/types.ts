import { AdmPage } from "components/pages/AdminPage/routes/constants";
import { StlPage } from "components/pages/StylistPage/routes/consts";
import { UsrPage } from "components/pages/UserPage/routes/consts";
import { Page } from "routes/constants";

export enum EUser {
  USER = "USER",
  ADMIN = "ADMIN",
  STYLIST = "STYLIST",
}

export enum EQuize {
  FOR_MEN = "for-men",
  FOR_WOMEN = "for-women",
}

export type TFormField = {
  id: string;
  type: string;
  name: string;
  label: string;
  readonly?: boolean;
  options?: TypeSelectOption[];
};

export type TypeSelectOption = {
  title: string;
  value: string | number;
};

export type TStylistPage = {
  type: StlPage | Page | AdmPage | UsrPage;
  path: string;
  exact?: boolean;
  component: JSX.Element;
};

export type TUserInfo = {
  id: number;
  name: string;
  login: string;
  age: number;
  city: string;
  role: EUser;
  expire: number;
  createdAt: string;
};
