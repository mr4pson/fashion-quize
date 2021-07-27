import { AdmPage } from "components/pages/AdminPage/routes/constants";
import { StlPage } from "components/pages/StylistPage/routes/consts";
import { UsrPage } from "components/pages/UserPage/routes/consts";
import { Page } from "routes/constants";

export enum userType {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STYLIST = 'STYLIST'
}

export enum QuizeTypes {
  FOR_MEN = "for-men",
  FOR_WOMEN = "for-women",
}

export type TypeFormField = {
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

export interface IStylistPage {
  type: StlPage | Page | AdmPage | UsrPage;
  path: string;
  exact?: boolean;
  component: JSX.Element;
}

export interface IUserInfo {
  id: number;
  name: string;
  login: string;
  age: number;
  city: string;
  role: userType;
  expire: number;
  createdAt: string;
}