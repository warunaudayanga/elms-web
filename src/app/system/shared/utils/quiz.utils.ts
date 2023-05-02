import { Quiz } from "../interfaces/quiz.interfaces";
import { QuizDraft } from "../types/quiz.types";

export const quizToDraft = (quiz: Quiz): QuizDraft => {
    return {
        id: quiz.id,
        question: quiz.question,
        choice: Boolean(quiz.options),
        multiple: quiz.multiple,
        options: quiz.options?.map(option => ({ value: option })),
    };
};

export const draftToQuiz = (draft: QuizDraft): Quiz => {
    return {
        id: draft.id,
        question: draft.question ?? "",
        options: draft.options?.map(option => option.value),
        multiple: draft.multiple,
    };
};
