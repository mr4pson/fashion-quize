import { message } from "antd";
import axios from "axios";
import { getUserInfo, openNotification } from "common/helpers/common-helpers";
// import { getUserInfo } from "components/common/commonHelper";
import { userType } from "common/types/type";
import { useState } from "react";
import { Page } from "routes/constants";
import { getLoginError, removeJwtPair, setJwtPair } from "../components/pages/AdminPage/helpers";
import { AdmPage, paths } from "../components/pages/AdminPage/routes/constants";
import { TypeAuthLoginResponse, TypeUseAuthHookResult, TypeUser } from "../components/pages/AdminPage/types";

export function useAuth(history): TypeUseAuthHookResult {
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
      if (userInfo?.role === userType.ADMIN) {
        message.success({ content: "Авторизация прошла успешно", key: "auth" });
        history.push(paths[AdmPage.BLOCKS]);
      } else {
        history.push(paths[Page.LOGIN]);
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
    history.push("/login");
  }

  return {
    loading,
    login,
    logout,
  };
}
