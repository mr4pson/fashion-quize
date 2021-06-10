import {
  FileSearchOutlined,
  PieChartOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import axios from "axios";
import React from "react";
import { getJwtPair } from "./helpers";
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
    icon: <QuestionCircleOutlined />,
    title: "Вопросы",
    route: paths[AdmPage.QUESTIONS],
  },
  {
    key: "3",
    icon: <FileSearchOutlined />,
    title: "Ответы",
    route: paths[AdmPage.ANSWERS],
  },
];

const defaultOptions = {
  baseURL: "",
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  const token = await getJwtPair();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});