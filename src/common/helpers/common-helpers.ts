import { message, notification } from "antd";

import { EUser, TUserInfo } from "common/types/types";
import { extractHS256Token } from "jwt-hs256";

export function getUserInfo(): TUserInfo | null {
  const jwtPair: string | null = localStorage.getItem("jwtPair")
    ? localStorage.getItem("jwtPair")
    : "";
  const currentJwt: string = jwtPair ? JSON.parse(jwtPair) : "";
  if (!currentJwt) {
    return null;
  }
  const jwtInfo = extractHS256Token(currentJwt, "123");
  let roles: string[] = [];
  try {
    roles = JSON.parse(jwtInfo.roles);
  } catch (error) {
    message.destroy("auth");
    openNotification(
      "error",
      "Ошибка на стороне сервера. Роли пользователя либо отсутствуют, либо заданы неверно"
    );
  }
  const userInfo = {
    id: jwtInfo.id,
    name: jwtInfo.name,
    login: jwtInfo.login,
    age: jwtInfo.age,
    sex: jwtInfo.sex,
    city: jwtInfo.city,
    role: roles[0] as EUser,
    expire: jwtInfo.exp,
    createdAt: jwtInfo.createdAt,
  };

  return userInfo;
}

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

export const openNotification = (type: string, message: string) => {
  const key = `open${Date.now()}`;
  notification[type]({
    message: message,
    key,
    onClose: close,
  });
};

export const errorResponseHandler = ({ error, logout }) => {
  // check for errorHandle config
  if (
    error.config?.hasOwnProperty("errorHandle") &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }

  if (!error.response) {
    openNotification("error", "Отсутствует интернет соединение");
  }

  // if has response show the error
  if (error.response && [409].includes(error.response.status)) {
    openNotification("error", "Такой пользователь уже существует");
  }

  // if has response show the error
  if (error.response && [504, 500].includes(error.response.status)) {
    openNotification("error", "Ошибка сервера");
  }

  if (error.response && [403].includes(error.response.status)) {
    openNotification("error", "У вас недостаточно прав");
  }

  if (error.response && [401].includes(error.response.status)) {
    message.loading({ content: "Загрузка...", key: "token" });
    logout();
  }
};

export function getImageUrl(fileName: string): string {
  return `/api/attachments/${fileName}`;
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function numberWithSpaces(number: number): string {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
