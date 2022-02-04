import { TypeBlock } from "components/pages/AdminPage/BlocksPage/type";
import { QuestionType, TypeQuestion } from "../types";

export const getQuestionOptions = (options: string | undefined): string[] => {
  return options ? (JSON.parse(options!) as string[]) : [];
};

export const checkIfSingleInput = (currentBlock: TypeBlock, index: number) => {
  return (
    (currentBlock.questions as TypeQuestion[])[index - 1]?.type !== QuestionType.INPUT &&
    (currentBlock.questions as TypeQuestion[])[index - 1]?.type !== QuestionType.INPUT
  );
};
