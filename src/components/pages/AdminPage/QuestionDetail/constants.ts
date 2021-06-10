import { QuestionType } from "components/pages/QuizePage/types";
import { TypeSelectOption } from "../types";

export const QuestionTypeOptions: TypeSelectOption[] = [
  {
    title: 'Строка',
    value: QuestionType.INPUT,
  },
  {
    title: 'Текст',
    value: QuestionType.TEXT,
  },
  {
    title: 'Один вариант',
    value: QuestionType.SINGLE_OPTION,
  },
  {
    title: 'Несколько вариантов',
    value: QuestionType.MULTIPLE_OPTION,
  },
]
