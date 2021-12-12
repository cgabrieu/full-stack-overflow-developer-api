export interface Question {
    id?: number,
    userId?: number,
    student: string,
    question: string,
    points?: number,
    tags: string,
    submitAt: string,
}