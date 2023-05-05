import { QuizDraft } from "../types/quiz.types";

export interface QuizAnswer {
    id: string;
    answer: string[];
}

export interface Quiz {
    id: string;
    heading?: string;
    question: string;
    options?: string[];
    multiple?: boolean;
    answer?: string[];
}

export interface QuizAnswerList {
    assessmentId: number;
    answers: QuizAnswer[];
}

export interface AssessmentDraft {
    classRoomId: number;
    name?: string;
    description?: string;
    passMarks?: number;
    startTime?: string;
    endTime?: string;
    drafts?: QuizDraft[];
}
