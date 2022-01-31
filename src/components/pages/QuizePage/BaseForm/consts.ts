import { Rule } from "antd/lib/form";
import { Key } from "react";

type TFields = {
  key?: Key;
  name: string;
  label?: string;
  valuePropName?: string;
  rules: Rule[];
  mask?: string;
};

export const checkbox: TFields = {
  name: "policy",
  valuePropName: "checked",
  rules: [
    {
      validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("Следует принять соглашение"))),
    },
  ],
};

export const fields: TFields[] = [
  {
    key: "1",
    name: "name",
    label: "ФИО",
    rules: [{ required: true }],
  },
  {
    key: "2",
    name: "phone",
    label: "Номер телефона",
    rules: [{ required: true }],
    mask: "+7 (111) 111-11-11",
  },
  {
    key: "3",
    name: "city",
    label: "Город проживания",
    rules: [{ required: true }],
  },
  {
    key: "4",
    name: "email",
    label: "Email",
    rules: [{ required: true, type: "email" }],
  },
];
