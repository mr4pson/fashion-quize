import { Button } from "antd";
import { TypeStylists } from "./types";

export const EDIT = "EDIT";
export const DELETE = "DELETE";

export const actionButtons = [
  {
    id: "1",
    type: EDIT,
    action: "Изменить",
  },
  {
    id: "2",
    type: DELETE,
    action: "Удалить",
  },
];

export const getColumns = (
  styles: { readonly [key: string]: string },
  getActionRow: (type: string, id: number) => any
) => {
  return [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "ФИО", dataIndex: "name", key: "name" },
    { title: "Логин", dataIndex: "login", key: "login" },
    { title: "Дата создания", dataIndex: "createdAt", key: "createdAt" },
    { title: "Дата обновления", dataIndex: "updatedAt", key: "updatedAt" },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (stylist: TypeStylists) => (
        <>
          {actionButtons.map((button) => (
            <Button
              key={button.id}
              onClick={getActionRow(button.type, +stylist.id)}
              className={styles["action"]}
              type="link"
            >
              {button.action}
            </Button>
          ))}
        </>
      ),
    },
  ];
};
