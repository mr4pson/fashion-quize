export enum QuestionType {
    INPUT = 'INPUT',
    TEXT = 'TEXT',
    SINGLE_OPTION = 'SINGLE_OPTION',
    MULTIPLE_OPTION = 'MULTIPLE_OPTION'
}

// type TypeQuestionOption = {
//     value: string;
// }

export type TypeQuestionBlock = {
    id: number;
    title: string;
}

export type TypeQuestion = {
    id: number;
    type: QuestionType;
    description: string;
    options?: string[];
    block: TypeQuestionBlock;
}

export type TypeQuizePageState = {
    answers: Object;
    setStateAnswersToState: (arg) => void;
}