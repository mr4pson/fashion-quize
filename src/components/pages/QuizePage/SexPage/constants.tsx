import { ManOutlined, WomanOutlined } from "@ant-design/icons";

import { EQuize } from "common/types/types";
import { Sex } from "./types";

export const sexs: Sex[] = [
  {
    label: "Мужчина",
    path: EQuize.FOR_MEN,
    icon: <ManOutlined />,
  },
  {
    label: "Женщина",
    path: EQuize.FOR_WOMEN,
    icon: <WomanOutlined />,
  },
];
