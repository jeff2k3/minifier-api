import Joi from 'joi';

export default Joi.object({
    code: Joi.string().required().messages({
        'string.empty': 'Code cannot be empty',
        'any.required': 'Code is required'
    }),
    options: Joi.object().optional()
});