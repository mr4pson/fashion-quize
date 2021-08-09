import { ManOutlined, WomanOutlined } from "@ant-design/icons";

import { EQuize } from "common/types/types";
import { ESexes } from "components/pages/StylistPage/TasksPage/types";
import { Sex } from "./types";

export const sexs: Sex[] = [
  {
    label: "Мужчина",
    path: EQuize.FOR_MEN,
    icon: <ManOutlined />,
    value: ESexes.MALE,
  },
  {
    label: "Женщина",
    path: EQuize.FOR_WOMEN,
    icon: <WomanOutlined />,
    value: ESexes.FEMALE,
  },
];
