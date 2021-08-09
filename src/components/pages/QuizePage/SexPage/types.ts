import { EQuize } from "common/types/types";
import { ESexes } from "components/pages/StylistPage/TasksPage/types";
import { ReactElement } from "react";

export type Sex = {
  label: string;
  path: EQuize;
  value: ESexes;
  icon: ReactElement;
};
