import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";

export enum ESexes {
  MALE = "MALE",
  FEMALE = "FEMALE"
};

export type TypeTask = {
  id: number;
  date: string;
  type: TaskType;
  status: TaskStatus;
  compilation: TCompilation;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  // stylist: User,
};

export type TUser = {
  id?: number;
  login: string;
  name: string;
  roles: string;
  city: string;
  sex: ESexes;
  age: number;
  createdAt: Date;
  updatedAt: Date;
  tasks?: TypeTask[];
  // answers: any[];
};

export type TaskStatus = {
  id: number;
  title: string;
};

export type TaskType = {
  id: number;
  title: string;
};
