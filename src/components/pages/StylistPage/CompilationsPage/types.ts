export type TCompilation = {
  id: number;
  task: any;
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
