export type TCompilation = {
  id: number;
  task: any;
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
};
