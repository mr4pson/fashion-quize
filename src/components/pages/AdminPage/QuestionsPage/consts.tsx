import { Button } from "antd";
import { QuestionType } from "components/pages/QuizePage/types";

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
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Вопрос", dataIndex: "title", key: "title" },
    { title: "Описание", dataIndex: "description", key: "description" },
    { title: "Изображение", dataIndex: "image", key: "image" },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      render: (type: QuestionType) =>
        ({
          [QuestionType.INPUT]: "Строка",
          [QuestionType.TEXT]: "Текст",
          [QuestionType.SINGLE_OPTION]: "Один вариант",
          [QuestionType.MULTIPLE_OPTION]: "Несколько вариантов",
        }[type]),
    },
    {
      title: "Блок",
      dataIndex: "block",
      key: "block",
      render: ({ title }) => title,
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: ({ id }) => (
        <>
          {actionButtons.map((button) => (
            <Button key={button.id} onClick={getActionRow(button.type, id)} className={styles["action"]} type="link">
              {button.action}
            </Button>
          ))}
        </>
      ),
    },
  ];
};
