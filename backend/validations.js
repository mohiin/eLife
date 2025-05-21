
import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be empty`,
        "any.required": `"name" is required`
    }),
    description: Joi.string().required().messages({
        "string.base": `"description" should be a type of 'text'`,
        "string.empty": `"description" cannot be empty`,
        "any.required": `"description" is required`
    }),

    price: Joi.number().required().messages({
        "number.base": `"price" must be a number`,
        "any.required": `"price" is required`
    }),
    category: Joi.string().required().messages({
        "string.base": `"category" must be text`,
        "any.required": `"category" is required`
    }),
    owner: Joi.string().required().messages({
        "string.base": `"owner" should be a type of 'text'`,
        "string.empty": `"owner" cannot be empty`,
        "any.required": `"owner" is required`
    }),

})