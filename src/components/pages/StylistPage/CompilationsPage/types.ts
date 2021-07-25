export interface ICompilation {
  id: number;
  task: any;
  looks: ILook[];
}

export interface ILook {
  id?: number;
  items: ILookItem[];
}

export interface ILookItem {
  id?: number;
  name: string;
  photo: string;
}
