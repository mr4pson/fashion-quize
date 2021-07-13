import { Button } from "antd";
import { memo } from "react";
import { useHistory } from "react-router";

import { paths, StlPage } from "../routes/consts";
import styles from "./CompilationsPage.module.scss";
import { ICompilation, ILook } from "./types";

type TProps = {
  id?: number;
  task?: any;
};

const StlButton: React.FC<TProps> = ({ id, task }) => {
  const history = useHistory();

  const handleClick = () => {
    if (task) {
      history.push(paths[StlPage.TASKS] + `/${id}`);
    } else {
      history.push(paths[StlPage.COMPILATIONS] + `/${id}`);
    }
  };

  return (
    <Button className={styles["action"]} onClick={handleClick} type="link">
      {task ?? "Изменить"}
    </Button>
  );
};

const StlButtonMemorized = memo(StlButton);

export const getColumns = () => {
  return [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Статус", dataIndex: "status", key: "status" },
    {
      title: "Задача",
      dataIndex: "",
      key: "task",
      render: (compilation: ICompilation) => <StlButtonMemorized task={compilation.task} id={compilation.id} />,
    },
    { title: "Пользователь", dataIndex: "user", key: "user" },
    {
      title: "Луки",
      dataIndex: "looks",
      key: "looks",
      render: (looks: ILook[]) => (
        <div>
          {looks?.length &&
            looks.map((look) => (
              <div key={look.id}>
                {look.items.map((item) => (
                  <div key={item.id}>{item.photo}</div>
                ))}
              </div>
            ))}
        </div>
      ),
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (compilation: ICompilation) => <StlButtonMemorized id={compilation.id} />,
    },
  ];
};
