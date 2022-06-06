import {
  FileSearchOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { getJwtPair } from "common/helpers/auth-helpers";
import { EQuize } from "common/types/types";
import { AdmPage, paths } from "./routes/constants";

export const getSelectedKey = (location: string) => {
  if (location.includes(paths[AdmPage.BLOCKS])) return "1";
  if (location.includes(paths[AdmPage.QUESTIONS])) return "2";
  if (location.includes(paths[AdmPage.STYLISTS])) return "3";
  if (location.includes(paths[AdmPage.TASKS])) return "4";
  if (location.includes(paths[AdmPage.COMPILATIONS])) return "5";
  if (location.includes(paths[AdmPage.USERS])) return "6";
  return "1";
};

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
    route: `${paths[AdmPage.QUESTIONS]}/${EQuize.FOR_MEN}`,
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    title: "Стилисты",
    route: paths[AdmPage.STYLISTS],
  },
  {
    key: "4",
    icon: <SolutionOutlined />,
    title: "Задачи",
    route: paths[AdmPage.TASKS],
  },
  {
    key: "5",
    icon: <FileSearchOutlined />,
    title: "Подборки",
    route: paths[AdmPage.COMPILATIONS],
  },
  {
    key: "6",
    icon: <UserOutlined />,
    title: "Пользователи",
    route: paths[AdmPage.USERS],
  },
];

const defaultOptions = {
  baseURL: "http://185.46.10.38:3100",
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  const token = await getJwtPair();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
