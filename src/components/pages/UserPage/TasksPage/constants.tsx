import { Button } from "antd";
import { TaskStatus, TaskType } from "components/pages/StylistPage/TasksPage/types";

export const getColumns = (styles: any, onTaskCancel: (id: number) => void) => {
  return [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      render: (type: TaskType) => (
        <div className={styles["type"]}>{type?.title}</div>
      ),
    },
    { 
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status: TaskStatus) => (
        <div className={styles["status"]}>{status?.title}</div>
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
      title: "Исполнить до",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <div>{date}</div>
      )
    },
    {
      title: "Действие",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          onClick={() => onTaskCancel(id)}
          type="link"
        >
          Отменить
        </Button>
      )
    },
  ];
}