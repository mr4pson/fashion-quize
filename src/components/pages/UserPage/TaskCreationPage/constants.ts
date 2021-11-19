import { TFormField } from "common/types/types";

export enum FieldTypes {
  TYPE = "TYPE",
  DATE = "DATE",
  TIME = "TIME",
  COMMENT = "COMMENT",
}


export const formFields: TFormField[] = [
  {
    id: "1",
    type: FieldTypes.TYPE,
    name: "type",
    label: "Тип",
  },
  {
    id: "2",
    type: FieldTypes.DATE,
    name: "date",
    label: "Дата исполнения",
  },
  {
    id: "3",
    type: FieldTypes.TIME,
    name: "time",
    label: "Время исполнения",
  },
  {
    id: "4",
    type: FieldTypes.COMMENT,
    name: "comment",
    label: "Комментарий",
  },
];
