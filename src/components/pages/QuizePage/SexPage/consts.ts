import { cardFemale, cardMale } from "assets";
import { EQuize } from "common/types/types";

export const values = [
  { type: "FEMALE", path: EQuize.FOR_WOMEN },
  { type: "MALE", path: EQuize.FOR_MEN },
];

export const radios = [
  {
    key: "1",
    label: "Для неё",
    src: cardFemale,
    value: values[0],
  },
  {
    key: "2",
    label: "Для него",
    src: cardMale,
    value: values[1],
  },
];
