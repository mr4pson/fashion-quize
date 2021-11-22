import { AxiosResponse } from "axios";
import { LoginError } from "components/pages/AdminPage/types";

export const setJwtPair = (jwtPair: string): void => {
  localStorage.setItem("jwtPair", JSON.stringify(jwtPair));
};

export const removeJwtPair = () => {
  localStorage.removeItem("jwtPair");
};

export const getJwtPair = async (): Promise<string> => {
  const jwtPairStringified: string | null = localStorage.getItem("jwtPair") ? localStorage.getItem("jwtPair") : "";
  const jwtPair: string = jwtPairStringified ? JSON.parse(jwtPairStringified) : "";
  return jwtPair;
};

export function getLoginError(response: AxiosResponse): LoginError {
  switch (response?.data?.error) {
    default:
      return LoginError.WRONG_PASSWORD;
  }
}
