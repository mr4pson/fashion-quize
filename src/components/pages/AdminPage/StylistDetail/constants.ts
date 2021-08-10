import { ESexes } from "components/pages/StylistPage/TasksPage/types";

export const FULL_NAME = "FULL_NAME";
export const LOGIN = "LOGIN";
export const AGE = "AGE";
export const CITY = "CITY";
export const SEX = "SEX";
export const BUTTON = "BUTTON";

export const formFields = [
  {
    id: "1",
    type: FULL_NAME,
    name: "name",
    label: "ФИО",
  },
  {
    id: "2",
    type: LOGIN,
    name: "login",
    label: "Логин",
  },
  {
    id: "3",
    type: AGE,
    name: "age",
    label: "Возраст",
  },
  {
    id: "4",
    type: SEX,
    name: "sex",
    label: "Пол",
  },
  {
    id: "5",
    type: CITY,
    name: "city",
    label: "Город",
  },
  {
    id: "6",
    type: BUTTON,
    name: "button",
    label: "Сохранить",
  },
];

export const sexOptions = [
  {
    value: ESexes.MALE,
    title: 'Мужской',
  },
  {
    value: ESexes.FEMALE,
    title: 'Женский',
  }
]