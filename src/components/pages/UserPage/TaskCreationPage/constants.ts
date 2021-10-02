import { TFormField } from "common/types/types";

const TYPE = "TYPE";
const DATE = "DATE";
const TIME = "TIME";
const COMMENT = "COMMENT";

export const formFields: TFormField[] = [
  {
    id: "1",
    type: TYPE,
    name: "type",
    label: "Тип",
  },
  {
    id: "2",
    type: DATE,
    name: "date",
    label: "Дата исполнения",
  },
  {
    id: "3",
    type: TIME,
    name: "time",
    label: "Время исполнения",
  },
  {
    id: "4",
    type: COMMENT,
    name: "comment",
    label: "Комментарий",
  },
];
