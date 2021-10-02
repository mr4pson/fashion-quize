export const TYPE = "TYPE";
export const STATUS = "STATUS";
export const CREATED_AT = "CREATED_AT";
export const UPDATED_AT = "UPDATED_AT";
export const DATE = "DATE";
export const COMMENT = "COMMENT";
export const BUTTON = "BUTTON";

export const formFields = [
  {
    id: "1",
    type: TYPE,
    name: "type",
    label: "Тип",
    readonly: true,
  },
  {
    id: "2",
    type: STATUS,
    name: "status",
    label: "Статус",
  },
  {
    id: "3",
    type: CREATED_AT,
    name: "createdAt",
    label: "Дата создания",
    readonly: true,
  },
  {
    id: "4",
    type: UPDATED_AT,
    name: "updatedAt",
    label: "Дата изменения",
    readonly: true,
  },
  {
    id: "5",
    type: DATE,
    name: "date",
    label: "Дата исполнения",
    readonly: true,
  },
  {
    id: "6",
    type: DATE,
    name: "time",
    label: "Время исполненения",
    readonly: true,
  },
  {
    id: "7",
    type: COMMENT,
    name: "comment",
    label: "Комментарий",
    readonly: true,
  },
  {
    id: "8",
    type: BUTTON,
    name: "button",
    label: "Сохранить",
  },
];
