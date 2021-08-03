import { TCompilation } from "../CompilationsPage/types";

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
  createdAt: Date;
  updatedAt: Date;
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
