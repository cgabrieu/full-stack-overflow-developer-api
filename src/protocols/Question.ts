export interface Question {
    id?: number,
    userId?: number,
    question: string,
    student: string,
    class: string,
    points?: number,
    tags: string,
    answered?: boolean,
    submitAt?: string,
}