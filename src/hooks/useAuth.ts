import { message } from "antd";
import axios from "axios";
import { useState } from "react";

import { getLoginError, removeJwtPair, setJwtPair } from "common/helpers/auth-helpers";
import { getUserInfo, openNotification } from "common/helpers/common-helpers";
// import { getUserInfo } from "components/common/commonHelper";
import { EUser } from "common/types/types";
import { History } from "history";
import { Page, paths } from "routes/constants";
import { TypeAuthLoginResponse, TypeUseAuthHookResult, TypeUser } from "../components/pages/AdminPage/types";

export function useAuth(history: History<unknown> | string[]): TypeUseAuthHookResult {
  const [loading, setLoading] = useState<boolean>(false);

  async function login({ login, password }: TypeUser): Promise<TypeAuthLoginResponse> {
    setLoading(true);
    try {
      message.loading({ content: "Загрузка...", key: "auth" });
      const { data: tokenData } = await axios.post<{ accessToken: string }>(
        `/api/auth/login`,
        {
          login: login,
          password: password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("password", password);
      setJwtPair(tokenData.accessToken);
      const userInfo = getUserInfo();
      if (userInfo?.role) {
        message.success({ content: "Авторизация прошла успешно", key: "auth" });
      }

      switch (userInfo?.role) {
        case EUser.ADMIN:
          history.push(paths[Page.ADMIN]);
          break;
        case EUser.STYLIST:
          history.push(paths[Page.STYLIST]);
          break;
        case EUser.USER:
          history.push(paths[Page.USER]);
          break;
        default:
          history.push(paths[Page.LOGIN]);
          break;
      }
      return {};
    } catch ({ response }) {
      console.log(response);
      if (response?.status === 401) {
        openNotification("error", "Неправильный логин или пароль");
      } else {
        openNotification("error", "Внутрення ошибка сервера");
      }
      message.destroy("auth");
      return { error: getLoginError(response) };
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    removeJwtPair();
    history?.push(paths[Page.LOGIN]);
  }

  return {
    loading,
    login,
    logout,
  };
}
