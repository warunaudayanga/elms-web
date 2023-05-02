import { Quiz, QuizAnswer } from "../interfaces/quiz.interfaces";

export interface AssessmentDto {
    name: string;
    description?: string;
    quizzes?: Quiz[];
    answers?: QuizAnswer[];
    passMarks?: number;
}
