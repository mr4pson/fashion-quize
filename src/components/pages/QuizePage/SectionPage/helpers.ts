import classNames from "classnames";
import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { QuestionType, TypeQuestion } from "../types";

export const getQuestionOptions = (options: string | undefined): string[] => {
  return options ? (JSON.parse(options!) as string[]) : [];
};

export const getFormItemClassNames = (questionType: QuestionType, styles) => {
  return classNames({
    [styles["form-item"]]: true,
    [styles["form-item--input"]]: questionType === QuestionType.INPUT,
    [styles["form-item--text"]]: questionType === QuestionType.TEXT,
    [styles["form-item--single-option"]]:
      questionType === QuestionType.SINGLE_OPTION,
    [styles["form-item--multiple-option"]]:
      questionType === QuestionType.MULTIPLE_OPTION,
  });
};

export const checkIfSingleInput = (currentBlock: TypeBlock, index: number) => {
  return (
    (currentBlock.questions as TypeQuestion[])[index - 1]?.type !==
    QuestionType.INPUT &&
    (currentBlock.questions as TypeQuestion[])[index - 1]?.type !==
    QuestionType.INPUT
  );
};