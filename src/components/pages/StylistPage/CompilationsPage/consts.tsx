import { Button } from "antd";
import { memo } from "react";

import { ICompilation } from "./types";

type TProps = {
  id?: number;
  task?: any;
  styles: { readonly [key: string]: string };
};

const StlButton: React.FC<TProps> = ({ id, task, styles }) => {
  const handleClick = () => {
    if (task) {
      console.log(task);
    } else {
      console.log(`editing ${id}`);
    }
  };

  return (
    <Button className={styles["action"]} onClick={handleClick} type="link">
      {task ?? "Изменить"}
    </Button>
  );
};

const StlButtonMemorized = memo(StlButton);

export const getColumns = (styles: { readonly [key: string]: string }) => {
  return [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Статус", dataIndex: "status", key: "status" },
    {
      title: "Задача",
      dataIndex: "",
      key: "task",
      render: (compilation: ICompilation) => <StlButtonMemorized task={compilation.task} styles={styles} />,
    },
    { title: "Пользователь", dataIndex: "user", key: "user" },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (compilation: ICompilation) => <StlButtonMemorized id={compilation.id} styles={styles} />,
    },
  ];
};
