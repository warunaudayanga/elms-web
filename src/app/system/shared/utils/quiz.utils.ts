import { Quiz } from "../interfaces/quiz.interfaces";
import { QuizDraft } from "../types/quiz.types";
import { v4 as uuid } from "uuid";

export const quizToDraft = (quiz: Quiz): QuizDraft => {
    const options = quiz.options?.map(option => ({ id: uuid(), value: option })) ?? [];
    const answer = quiz.answer?.map(ans => options!.find(option => option.value === ans)?.id!) ?? [];
    return {
        id: quiz.id,
        question: quiz.question,
        choice: Boolean(quiz.options),
        multiple: quiz.multiple,
        options,
        answer,
    };
};

export const draftToQuiz = (draft: QuizDraft): Quiz => {
    return {
        id: draft.id,
        question: draft.question ?? "",
        options: draft.choice ? draft.options?.map(option => option.value) : undefined,
        multiple: draft.multiple,
        answer: draft.options?.length && draft.answer?.length ? draft.answer.map(ans => draft.options!.find(option => option.id === ans)!.value) : [],
    };
};
