import { QuizeTypes } from "common/types/type";
import { Page, paths, QUESTION_NUMBER, QUIZE_TYPE } from "routes/constants";

export const getNextQuestionLink = (index: number, quizeType: QuizeTypes): string => {
    return paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, quizeType).replace(QUESTION_NUMBER, (++index).toString());
}
export const getPrevQuestionLink = (index: number, quizeType: QuizeTypes): string => {
    return paths[Page.QUIZE_ROUTE].replace(QUIZE_TYPE, quizeType).replace(QUESTION_NUMBER, (--index).toString());
}