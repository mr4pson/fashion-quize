import { EQuize } from "common/types/types";
import { Page, paths, QUESTION_NUMBER, QUIZE_TYPE } from "routes/constants";

export const getNextQuestionLink = (index: number, quizeType: EQuize): string => {
  return paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, quizeType).replace(QUESTION_NUMBER, (++index).toString());
};
export const getPrevQuestionLink = (index: number, quizeType: EQuize): string => {
  return paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, quizeType).replace(QUESTION_NUMBER, (--index).toString());
};
