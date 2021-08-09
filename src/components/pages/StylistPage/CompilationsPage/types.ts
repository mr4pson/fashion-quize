import { TypeTask } from "../TasksPage/types";

export type TCompilation = {
  id: number;
  task: TypeTask;
  looks: TLook[];
};

export type TLook = {
  id?: number;
  items: TLookItem[];
};

export type TLookItem = {
  id?: number;
  name: string;
  photo: string;
};
