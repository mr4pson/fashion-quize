import { Page, paths } from "routes/constants";

export const getNextQuestionLink = (index): string => {
    return paths[Page.QUIZE] + '/' + (++index);
}
export const getPrevQuestionLink = (index): string => {
    return paths[Page.QUIZE] + '/' + (--index);
}