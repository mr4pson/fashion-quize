import { Rule } from "antd/lib/form";
import { TFormField } from "common/types/types";
import { Key } from "react";

export enum FieldTypes {
  TYPE = "TYPE",
  DATE = "DATE",
  TIME = "TIME",
  COMMENT = "COMMENT",
}

type TFields = {
  key?: Key;
  name: string;
  label?: string;
  valuePropName?: string;
  rules: Rule[];
  mask?: string;
};

export const fields = [
  {
    key: "1",
    type: FieldTypes.TYPE,
    name: "type",
    label: "Что у вас намечается?",
    rules: [{ required: true }],
  },
  {
    key: "2",
    type: FieldTypes.DATE,
    name: "date",
    label: "Дата исполнения",
    rules: [{ required: true }],
  },
  {
    key: "3",
    type: FieldTypes.TIME,
    name: "time",
    mask: "11:11",
    label: "Время исполнения",
    rules: [{ required: true }],
  },
  {
    key: "4",
    type: FieldTypes.COMMENT,
    name: "comment",
    label: "Комментарий",
    rules: [],
  },
];
