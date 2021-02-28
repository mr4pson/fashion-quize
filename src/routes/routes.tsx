import HomePage from "components/pages/HomePage";
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
        // {
        //     type: Page.QUIZE,
        //     path: paths[Page.QUIZE],
        //     component: <LoginPage />
        // },
    ];
}