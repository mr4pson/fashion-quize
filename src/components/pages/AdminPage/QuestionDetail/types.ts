import { QuestionType, TypeQuestionBlock } from "components/pages/QuizePage/types";

export type ChangeQuestionDto = {
  type: QuestionType;
  description: string;
  options?: string[];
  image?: string;
  block: TypeQuestionBlock;
}