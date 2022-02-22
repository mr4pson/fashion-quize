import { Page, paths } from "routes/constants";

export const mobileNavItems = [
  {
    path: paths[Page.HOME],
    label: 'Главная',
  },
  {
    path: `${paths[Page.HOME]}#receive-section`,
    label: 'Как мы работаем?',
  },
  {
    path: `${paths[Page.HOME]}#q-and-a`,
    label: 'Вопросы & ответы',
  },
];
