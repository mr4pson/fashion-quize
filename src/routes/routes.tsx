import CompletePage from "components/pages/CompletePage";
import HomePage from "components/pages/HomePage";
import QuizePage from "components/pages/QuizePage";
import { Page, paths } from "./constants";
import { TypeRoute } from "./type";

export function getRoutes(): TypeRoute[] {
    return [
        {
            type: Page.HOME,
            path: paths[Page.HOME],
            component: <HomePage/>,
            exact: true,
        },
        {
            type: Page.QUIZEROUTE,
            path: paths[Page.QUIZEROUTE],
            component: <QuizePage />
        },
        {
            type: Page.COMPLETE,
            path: paths[Page.COMPLETE],
            component: <CompletePage />
        },
    ];
}