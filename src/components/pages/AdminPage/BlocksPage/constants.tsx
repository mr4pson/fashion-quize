import { TypeBlock } from "./type";

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
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Заголовок", dataIndex: "title", key: "title" },
    {
      title: "Цвет",
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div className={styles["color"]}>
          <div className={styles["color__name"]}>{color}</div>
          <div className={styles["color__box"]} style={{ background: color }}></div>
        </div>
      ),
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (blocks: TypeBlock) => (
        <>
          {actionButtons.map((button) => (
            <button
              key={button.id}
              onClick={getActionRow(button.type, blocks.id)}
              className={styles["action"]}
            >
              {button.action}
            </button>
          ))}
        </>
      ),
    },
  ];
};
