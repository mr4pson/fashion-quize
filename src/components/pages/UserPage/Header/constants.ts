import { paths, UsrPage } from "../routes/consts";
import { TypeMenuItem } from "./types";

export const menuItems: TypeMenuItem[] = [
  {
    title: 'Задачи',
    path: paths[UsrPage.TASKS],
  },
  {
    title: 'Подборки',
    path: paths[UsrPage.COMPILATIONS],
  },
  {
    title: 'Профиль',
    path: paths[UsrPage.PROFILE],
  },
];
