import { TStylistPage } from "common/types/types";
import BaseForm from "../BaseForm";
import SexPage from "../SexPage";
import { paths, QzPage } from "./constants";

export function getQuizeRoutes(): TStylistPage[] {
  return [
    {
      type: QzPage.BASE,
      path: paths[QzPage.BASE],
      component: <BaseForm />,
      exact: true,
    },
    {
      type: QzPage.SEX,
      path: paths[QzPage.SEX],
      component: <SexPage />,
      exact: true,
    },
  ];
}
