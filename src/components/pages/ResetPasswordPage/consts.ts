import { Rule } from "antd/lib/form";

type TField = {
  name: string;
  label: string;
  rules: Rule[];
};

export const field: TField = {
  name: "login",
  label: "Email",
  rules: [{ required: true, type: "email" }],
};

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  types: {
    email: "Некорректно введён ${label}",
  },
};
/* eslint-disable no-template-curly-in-string */
