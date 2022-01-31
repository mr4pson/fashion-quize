import { Rule } from "antd/lib/form";
import { Key } from "react";

type TFields = {
  key: Key;
  name: string;
  label: string;
  rules: Rule[];
};

export const fields: TFields[] = [
  {
    key: "1",
    name: "login",
    label: "Email",
    rules: [{ required: true, type: "email" }],
  },
  {
    key: "2",
    name: "password",
    label: "Пароль",
    rules: [{ required: true, min: 6, max: 20 }],
  },
];

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  string: {
    range: "${label} должен быть от ${min} до ${max} символов",
  },
  types: {
    email: "Некорректно введён ${label}",
  },
};
/* eslint-disable no-template-curly-in-string */
