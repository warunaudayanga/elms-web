import { Quiz } from "../interfaces/quiz.interfaces";

export type QuizDraft = Partial<Omit<Quiz, "options" | "id">> & {
    id: string;
    options?: { id: string; value: string }[];
    choice?: boolean;
};
