import { Button } from "antd";

const EDIT = "EDIT";
const DELETE = "DELETE";

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
    { title: "Возраст", dataIndex: "age", key: "age" },
    { title: "Город", dataIndex: "city", key: "city" },
    { title: "Дата создания", dataIndex: "createdAt", key: "createdAt" },
    { title: "Дата обновления", dataIndex: "updatedAt", key: "updatedAt" },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: ({ id }) => (
        <>
          {actionButtons.map((button) => (
            <Button key={button.id} onClick={getActionRow(button.type, +id)} className={styles["action"]} type="link">
              {button.action}
            </Button>
          ))}
        </>
      ),
    },
  ];
};
