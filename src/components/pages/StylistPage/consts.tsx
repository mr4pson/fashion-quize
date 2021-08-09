import { CarryOutOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";

import { paths, StlPage } from "./routes/consts";

export const getSelectedKey = (location: string) => {
  if (location.includes(paths[StlPage.TASKS])) return "1";
  if (location.includes(paths[StlPage.COMPILATIONS])) return "2";
  if (location.includes(paths[StlPage.USERS])) return "3";
  return "1";
};

export const menuItems = [
  {
    key: "1",
    icon: <SolutionOutlined />,
    title: "Задачи",
    route: paths[StlPage.TASKS],
  },
  {
    key: "2",
    icon: <CarryOutOutlined />,
    title: "Подборки",
    route: paths[StlPage.COMPILATIONS],
  },
  {
    key: "3",
    icon: <UserOutlined />,
    title: "Пользователи",
    route: paths[StlPage.USERS],
  },
];
