
export type TypeTask = {
  id: number;
  date: string;
  type: TaskType;
  status: TaskStatus;
  comment: string;
  createdAt: string;
  updatedAt: string;
  // user: UserInfo,
  // stylist: User,
}

export type User = {
  id?: number;
  login: string;
  name: string;
  roles: string;
  createdAt: Date;
  updatedAt: Date;
  answers: any[];
}

export type TaskStatus = {
  id: number;
  title: string;
}

export type TaskType = {
  id: number;
  title: string;
}

