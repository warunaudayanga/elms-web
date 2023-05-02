import { QuizAnswer } from "../../../system/shared/interfaces/quiz.interfaces";
import { Assessment } from "./assessment.interface";
import { User } from "./user.interface";
import { BaseEntity } from "./base-entity.interface";

export interface AssessmentSubmission extends BaseEntity {
    answers?: QuizAnswer[];
    marks?: number;
    assessmentId?: number;
    studentId: string;
    assessment?: Assessment;
    student?: User;
}
