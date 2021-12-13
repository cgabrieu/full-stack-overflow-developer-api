export interface Question {
    id?: number,
    user_id?: number,
    question: string,
    student: string,
    class: string,
    points?: number,
    tags: string,
    answered?: boolean,
    submit_at?: string,
}