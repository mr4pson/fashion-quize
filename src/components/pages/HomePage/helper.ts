import { Page, paths } from "routes/constants";

export const getLinkToFisrtQuestion = () => {
    return paths[Page.QUIZE] + '/' + 1;
}

export const getLinkToSexQuestion = () => {
    return paths[Page.QUIZE_SEX];
}