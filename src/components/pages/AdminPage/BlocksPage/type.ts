import { TypeQuestion } from "components/pages/QuizePage/types";

export type TypeBlock = {
  id: number;
  title: string;
  color: string;
  questions?: TypeQuestion[];
};
