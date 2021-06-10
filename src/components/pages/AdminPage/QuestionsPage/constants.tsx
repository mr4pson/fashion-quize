import { Button } from "antd";
import { QuestionType, TypeQuestion } from "components/pages/QuizePage/types";
import { TypeBlock } from "../BlocksPage/type";

export const CHANGE = "CHANGE";
export const DELETE = "DELETE";

export const actionButtons = [
  {
    id: "1",
    type: CHANGE,
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
    { title: "Вопрос", dataIndex: "description", key: "description" },
    { title: "Изображение", dataIndex: "image", key: "image" },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      render: (type: QuestionType) => {
        switch (type) {
          case QuestionType.INPUT:
            return "Строка";

          case QuestionType.TEXT:
            return "Текст";

          case QuestionType.SINGLE_OPTION:
            return "Один вариант";

          case QuestionType.MULTIPLE_OPTION:
            return "Несколько вариантов";

          default:
            break;
        }
      },
    },
    {
      title: "Блок",
      dataIndex: "block",
      key: "block",
      render: (block: TypeBlock) => {
        return block?.title;
      },
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: (question: TypeQuestion) => (
        <>
          {actionButtons.map((button) => (
            <Button
              key={button.id}
              onClick={getActionRow(button.type, question.id)}
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
