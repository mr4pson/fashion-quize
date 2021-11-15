import { EQuize } from "common/types/types";
// import { Page, paths, QUESTION_NUMBER, QUIZE_TYPE } from "routes/constants";

// export const getNextQuestionLink = (index: number, quizeType: EQuize): string => {
//   return paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, quizeType).replace(QUESTION_NUMBER, (++index).toString());
// };
// export const getPrevQuestionLink = (index: number, quizeType: EQuize): string => {
//   return paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, quizeType).replace(QUESTION_NUMBER, (--index).toString());
// };

export function hexToRgb(hex): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 0.65)` : '';
}