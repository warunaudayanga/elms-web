import { Quiz, QuizAnswer } from "../../../system/shared/interfaces/quiz.interfaces";
import { ClassRoom } from "./class-room.interface";
import { BaseEntity } from "./base-entity.interface";
import { AssessmentSubmission } from "./assessment-submission.interface";

export interface Assessment extends BaseEntity {
    name: string;
    description?: string;
    quizzes?: Quiz[];
    answers?: QuizAnswer[];
    passMarks?: number;
    startTime: string;
    endTime: string;
    classRoomId: number;
    classRoom?: ClassRoom;
    submission?: AssessmentSubmission;
    submissions?: AssessmentSubmission[];
}
