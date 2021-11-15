import { EQuize } from "common/types/types";
import { ESexes } from "components/pages/StylistPage/TasksPage/types";
import { ReactElement } from "react";

export type ISex = {
  label: string;
  path: EQuize;
  value: ESexes;
  icon: ReactElement;
  isActive: boolean;
};
