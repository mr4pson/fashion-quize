import { QuestionType, TypeQuestionBlock } from "components/pages/QuizePage/types";

export type ChangeQuestionDto = {
  type: QuestionType;
  description: string;
  directionAlignment: QuestionDirectionAlignments,
  options?: string[];
  image?: string;
  block: TypeQuestionBlock;
}

export enum QuestionDirectionAlignments {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL'
}
