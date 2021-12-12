import joi from 'joi';

const createUserSchema = joi.object({
    name: joi.string().min(3).max(50).alphanum().required(),
    class: joi.string().pattern(/[T]{1}\d{1,2}/).required()
});

export { createUserSchema };