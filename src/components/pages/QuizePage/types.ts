export enum QuestionType {
  INPUT = "INPUT",
  TEXT = "TEXT",
  SINGLE_OPTION = "SINGLE_OPTION",
  MULTIPLE_OPTION = "MULTIPLE_OPTION",
}

// type TypeQuestionOption = {
//     value: string;
// }

export type TypeQuestionBlock = {
  id: number;
  title: string;
  description?: string;
  color: string;
};

export type TypeQuestion = {
  id: number;
  type: QuestionType;
  description: string;
  title: string;
  options?: string;
  image?: string;
  block?: TypeQuestionBlock;
  directionAlignment?: "HORIZONTAL" | "VERTICAL";
};

export type TypeQuizePageState = {
  answers: Object;
  setStateAnswersToState: (arg) => void;
};
