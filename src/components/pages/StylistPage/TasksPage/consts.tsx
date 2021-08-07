import { Button } from "antd";
import { Link } from "react-router-dom";

import { paths, StlPage } from "../routes/consts";

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
      render: (cmp) => <Link to={`${paths[StlPage.COMPILATIONS]}/${cmp?.id}`}>{!!cmp?.id && `Подборка №${cmp?.id}`}</Link>,
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => <div className={styles["createdAt"]}>{createdAt}</div>,
    },
    {
      title: "Дата изменения",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => <div className={styles["updatedAt"]}>{updatedAt}</div>,
    },
    {
      title: "Исполнить до",
      dataIndex: "date",
      key: "date",
      render: (date) => <div>{date}</div>,
    },
    {
      title: "Действие",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button onClick={() => onEditClick(id)} type="link">
          Изменить
        </Button>
      ),
    },
  ];
};
