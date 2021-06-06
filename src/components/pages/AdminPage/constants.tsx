import {
  FileOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import React from "react";
import { AdmPage, paths } from "./routes/constants";

export const menuItems = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    title: "Блоки",
    route: paths[AdmPage.BLOCKS],
  },
  {
    key: "2",
    icon: <MenuFoldOutlined />,
    title: "Вопросы",
    route: paths[AdmPage.QUESTIONS],
  },
  {
    key: "3",
    icon: <FileOutlined />,
    title: "Ответы",
    route: paths[AdmPage.ANSWERS],
  },
];
