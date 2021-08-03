import { TFormField } from "common/types/types";

const TYPE = "TYPE";
const DATE = "DATE";
const COMMENT = "COMMENT";

export const formFields: TFormField[] = [
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
