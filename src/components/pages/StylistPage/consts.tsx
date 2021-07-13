import { CarryOutOutlined, SolutionOutlined } from "@ant-design/icons";
import axios from "axios";

import { getJwtPair } from "../AdminPage/helpers";
import { paths, StlPage } from "./routes/consts";

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
