import { FileSearchOutlined, PieChartOutlined, QuestionCircleOutlined, TeamOutlined } from "@ant-design/icons";
import axios from "axios";
import { getJwtPair } from "common/helpers/auth-helpers";
import { QuizeTypes } from "common/types/type";
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
    icon: <QuestionCircleOutlined />,
    title: "Опрос",
    route: `${paths[AdmPage.QUESTIONS]}/${QuizeTypes.FOR_MEN}`,
  },
  {
    key: "3",
    icon: <FileSearchOutlined />,
    title: "Ответы",
    route: paths[AdmPage.ANSWERS],
  },
  {
    key: "4",
    icon: <TeamOutlined />,
    title: "Стилисты",
    route: paths[AdmPage.STYLISTS],
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
