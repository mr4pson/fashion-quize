import { CarryOutOutlined, SolutionOutlined } from "@ant-design/icons";

import { paths, StlPage } from "./routes/consts";

export const getSelectedKey = (location: any) => {
  if (location.includes(paths[StlPage.TASKS])) return "1";
  if (location.includes(paths[StlPage.COMPILATIONS])) return "2";
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
];