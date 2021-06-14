import { QuizeTypes } from "common/types/type";
import { Sex } from "./types";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";

export const sexs: Sex[] = [
  {
    label: 'Мужчина',
    path: QuizeTypes.FOR_MEN,
    icon: <ManOutlined />,
  },
  {
    label: 'Женщина',
    path: QuizeTypes.FOR_WOMEN,
    icon: <WomanOutlined />,
  }
]