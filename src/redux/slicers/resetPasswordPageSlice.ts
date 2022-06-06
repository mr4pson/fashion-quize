import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { openNotification } from "common/helpers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/consts";

const resetPasswordPageSlice = createSlice({
  name: "resetPasswordPage",
  initialState: {},
  reducers: {},
});

export const resetPasswordThunks = {
  resetPassword: (login: string) => async () => {
    const payload = {
      login,
    };

    try {
      await axios.post(`/auth/reset-password`, payload);
      openNotification("success", `Запрос на восстановление пароля отправлен на ${login}`);
    } catch {
      openNotification("error", `Запрос на восстановление пароля не удался. Повторите запрос позже`);
    }
  },
  sendPasswordResetRequest: (token: string) => async () => {
    const payload = {
      token,
    };

    const response = await axiosInstance.post(`/auth/reset-password-confirmation`, payload);
    if (!response) {
      openNotification("error", `Токен невалидный. Попробуйте еще раз`);
      return false;
    } else {
      openNotification("success", `Пароль успешно восстановлен. На почту отправлен новый пароль`);
      return true;
    }
  },
};

export default resetPasswordPageSlice.reducer;
