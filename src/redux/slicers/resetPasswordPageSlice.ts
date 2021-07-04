import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { openNotification } from "common/helpers/common-helpers";

const resetPasswordPageSlice = createSlice({
  name: "resetPasswordPage",
  initialState: {},
  reducers: {},
});

export const resetPasswordThunks = {
  resetPassword: (login: string) => async () => {
    const payload = {
      login,
    }
    await axiosInstance.post(`/api/auth/reset-password`, payload);
    openNotification('success', `Запрос на восстановление пароля отправлен на ${login}`);
  },
  sendPasswordResetRequest: (token: string) => async () => {
    const payload = {
      token,
    }
    const response = await axiosInstance.post(`/api/auth/reset-password-confirmation`, payload);
    if (!response) {
      openNotification('error', `Токен невалидный. Попробуйте еще раз`);
      return false;
    }
    openNotification('success', `Пароль успешно восстановлен. На почту отправлен новый пароль`);
    return true;
  },
};

export default resetPasswordPageSlice.reducer;
