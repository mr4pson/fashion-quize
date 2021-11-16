import { TStylistPage } from "common/types/types";
import BaseForm from "../BaseForm";
import CompletePageContainer from "../CompletePage/CompletePageContainer";
import SectionPage from "../SectionPage/SectionPage";
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
    {
      type: QzPage.ROUTE,
      path: paths[QzPage.ROUTE],
      component: <SectionPage />,
    },
    {
      type: QzPage.COMPLETE,
      path: paths[QzPage.COMPLETE],
      component: <CompletePageContainer />,
      exact: true,
    },
  ];
}
