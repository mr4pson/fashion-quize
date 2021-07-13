export interface ICompilation {
  id: number;
  status: string;
  task: any;
  user: any;
  looks: ILook[];
}

export interface ILook {
  id: number;
  name: string;
  items: ILookItem[];
}

export interface ILookItem {
  id: number;
  name: string;
  photo: string;
}
