import { QuizAnswerList, AssessmentDraft } from "../../../system/shared/interfaces/quiz.interfaces";

export class SaveQuizAnswers {
    static readonly type = "[Quiz] SaveQuizAnswers";

    constructor(public payload: QuizAnswerList) {}
}

export class SaveAssessmentDrafts {
    static readonly type = "[Quiz] SaveAssessmentDrafts";

    constructor(public payload: AssessmentDraft) {}
}

export class ClearAssessmentDraft {
    static readonly type = "[Quiz] ClearAssessmentDraft";

    constructor(public payload: number) {}
}

export class ClearQuizAnswers {
    static readonly type = "[Quiz] ClearQuizAnswers";

    constructor(public payload: number) {}
}

export class InitQuizState {
    static readonly type = "[Quiz] InitQuizState";

    constructor() {}
}
