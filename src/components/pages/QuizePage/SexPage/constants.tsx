import { ManOutlined, WomanOutlined } from "@ant-design/icons";

import { EQuize } from "common/types/types";
import { ESexes } from "components/pages/StylistPage/TasksPage/types";
import { ISex } from "./types";

export const sexsDefault: ISex[] = [
  {
    label: "Мужской",
    path: EQuize.FOR_MEN,
    icon: <ManOutlined />,
    value: ESexes.MALE,
    isActive: false,
  },
  {
    label: "Женский",
    path: EQuize.FOR_WOMEN,
    icon: <WomanOutlined />,
    value: ESexes.FEMALE,
    isActive: false,
  },
];
