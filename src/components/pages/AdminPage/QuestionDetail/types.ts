import { QuestionType, TypeQuestionBlock } from "components/pages/QuizePage/types";
import { TypeSelectOption } from "../types";

export type TypeFormField = {
  id: string;
  type: string;
  name: string;
  label: string;
  options?: TypeSelectOption[];
};

export type ChangeQuestionDto = {
  type: QuestionType;
  description: string;
  options?: string[];
  image?: string;
  block: TypeQuestionBlock;
}