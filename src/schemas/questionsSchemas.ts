import joi from 'joi';

export const createQuestionSchema = joi.object({
    question: joi.string().min(5).required(),
    student: joi.string().min(3).required(),
    class: joi.string().pattern(/[T]{1}\d{1,}/).required(),
    tags: joi.string().min(3).required(),
});