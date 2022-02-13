import { Button } from "antd";
import { Link } from "react-router-dom";

import { paths, StlPage } from "../routes/consts";
import { TypeTask } from "./types";

export const getColumns = (styles: any, history: any) => {
  const onEditClick = (id) => {
    history.push(`${paths[StlPage.TASKS]}/${id}`);
  };

  return [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      render: ({ title }) => <div className={styles["type"]}>{title}</div>,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: ({ title }) => <div className={styles["status"]}>{title}</div>,
    },
    {
      title: "Подборка",
      dataIndex: "compilation",
      key: "compilation",
      render: (cmp) => (
        <Link to={`${paths[StlPage.COMPILATIONS]}/${cmp?.id}`}>
          {!!cmp?.id && `Подборка №${cmp?.id}`}
        </Link>
      ),
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "user",
      render: ({ id, name }) => (
        <Link to={`${paths[StlPage.USERS]}/${id}`}>{name}</Link>
      ),
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <div className={styles["createdAt"]}>{createdAt}</div>
      ),
    },
    {
      title: "Дата изменения",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => (
        <div className={styles["updatedAt"]}>{updatedAt}</div>
      ),
    },
    {
      title: "Дата исполнения",
      dataIndex: "date",
      key: "date",
      render: (date) => <div>{date}</div>,
    },
    {
      title: "Время исполнения",
      dataIndex: "time",
      key: "time",
      render: (time) => <div>{time}</div>,
    },
    {
      title: "Действие",
      dataIndex: "id",
      key: "id",
      render: (id, task: TypeTask) => {
        if (task.status.title !== "Завершена") {
          return (
            <button
              onClick={() => onEditClick(id)}
              className={styles["action"]}
            >
              Изменить
            </button>
          );
        }
        return;
      },
    },
  ];
};
