import { TypeFormField } from "common/types/type";

export const TYPE = "TYPE";
export const DATE = "DATE";
export const COMMENT = "COMMENT";

export const formFields: TypeFormField[] = [
  {
    id: "1",
    type: TYPE,
    name: "type",
    label: "Тип",
  },
  {
    id: "5",
    type: DATE,
    name: "date",
    label: "Исполнить до",
  },
  {
    id: "6",
    type: COMMENT,
    name: "comment",
    label: "Комментарий",
  },
];
