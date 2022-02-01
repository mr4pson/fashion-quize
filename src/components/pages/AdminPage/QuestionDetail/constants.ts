import { TypeSelectOption } from "common/types/types";
import { QuestionType } from "components/pages/QuizePage/types";
import { QuestionDirectionAlignments } from "./types";

export const QuestionTypeOptions: TypeSelectOption[] = [
  {
    title: "Строка",
    value: QuestionType.INPUT,
  },
  {
    title: "Текст",
    value: QuestionType.TEXT,
  },
  {
    title: "Один вариант",
    value: QuestionType.SINGLE_OPTION,
  },
  {
    title: "Несколько вариантов",
    value: QuestionType.MULTIPLE_OPTION,
  },
];

export const questionDirectionAlignments: TypeSelectOption[] = [
  {
    title: "Вертикальное",
    value: QuestionDirectionAlignments.VERTICAL,
  },
  {
    title: "Горизонтальное",
    value: QuestionDirectionAlignments.HORIZONTAL,
  }
];

export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  required: "${label} не может быть пустым!",
  string: {
    max: "${label} не может быть длиннее ${max} символов",
  },
};
/* eslint-enable no-template-curly-in-string */
