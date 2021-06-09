import axios from "axios";
// import { getUserInfo } from "components/common/commonHelper";
import { userType } from "common/types/type";
import { useState } from "react";
import { useHistory } from "react-router";
import { AdmPage, paths } from "../components/pages/AdminPage/routes/constants";
import { getLoginError, removeJwtPair, setJwtPair } from "../components/pages/AdminPage/helpers";
import { TypeAuthLoginResponse, TypeUseAuthHookResult, TypeUser } from '../components/pages/AdminPage/types';
import { Page } from "routes/constants";
import { getUserInfo } from "common/heplers/common-helpers";

export function useAuth(): TypeUseAuthHookResult {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  // const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<{ message: string }>({ message: '' });

  async function login({
    login,
    password,
  }: TypeUser): Promise<TypeAuthLoginResponse> {
    setLoading(true);
    try {
      const { data: tokenData } = await axios.post<{ accessToken: string }>(
        `/api/auth/login`, {
        login: login,
        password: password,
      },
        { withCredentials: true },
      );
      localStorage.setItem('password', password);
      setJwtPair(tokenData.accessToken);
      // setAuthenticated(true);
      const userInfo = getUserInfo();
      if (userInfo?.role === userType.ADMIN) {
        history.push(paths[AdmPage.BLOCKS]);
      } else {
        history.push(paths[Page.LOGIN]);
      }
      return {};
    } catch ({ response }) {
      // setAuthenticated(false);
      console.log(response);
      if (response?.status === 401) {
        console.log(errorInfo);
        setErrorInfo({ message: 'Неправильные логин или пароль' });
      } else {
        setErrorInfo({ message: 'Внутрення ошибка сервера' });
      }
      return { error: getLoginError(response) };
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    removeJwtPair();
    // setAuthenticated(false);
    history.push("/login");
  }

  return {
    loading,
    login,
    logout,
    // authenticated,
    errorInfo
  }
}