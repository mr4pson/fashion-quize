import { TypeTask } from "../TasksPage/types";

export type TCompilation = {
  id: number;
  task: TypeTask;
  looks: TLook[];
  createdAt: string;
};

export type TLook = {
  id?: number;
  items: TLookItem[];
  selected?: boolean;
};

export type TLookItem = {
  id?: number;
  name: string;
  photo: string;
  price: number;
};
