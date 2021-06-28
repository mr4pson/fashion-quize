import { Button, Input } from "antd";
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
    { title: "ФИО", dataIndex: "fullName", key: "fullName" },
    { title: "Почта", dataIndex: "email", key: "email" },
    {
      title: "Пароль",
      dataIndex: "password",
      key: "password",
      render: (password: string) => (
        <Input.Password placeholder="input password" value={password} style={{ ...inputStyles }} />
      ),
    },
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

const inputStyles = {
  border: "none",
};
