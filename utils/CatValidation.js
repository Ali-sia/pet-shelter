const Joi = require('joi');
const { enums } = require('../constants');

const catValidator = data => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      'any.required': 'Set cat name',
      'string.empty': 'Set cat name',
      'string.min': 'Cat name must have at least {#limit} characters',
      'string.max': 'Cat name cannot exceed {#limit} characters',
    }),
    age: Joi.number().min(0.1).max(35).required().messages({
      'any.required': 'Please provide the cat age',
      'number.base': 'Cat age must be a number',
      'number.min': 'Cat age must be at least {#limit}',
      'number.max': 'Cat age cannot exceed {#limit}',
    }),
    gender: Joi.string()
      .valid(...Object.values(enums.GENDERS_ENUM))
      .default(enums.GENDERS_ENUM.FEMALE),
    color: Joi.string()
      .valid(...Object.values(enums.COLORS_ENUM))
      .default(enums.COLORS_ENUM.TABBY),
    temperament: Joi.string().min(3).max(30).default('').messages({
      'string.empty': 'Set cat temperament',
      'string.min': 'Cat temperament must have at least {#limit} characters',
      'string.max': 'Cat temperament cannot exceed {#limit} characters',
    }),
    description: Joi.string().min(30).max(200).required().messages({
      'any.required': 'Set cat description',
      'string.empty': 'Set cat description',
      'string.min': 'Cat description must have at least {#limit} characters',
      'string.max': 'Cat description cannot exceed {#limit} characters',
    }),
    status: Joi.string()
      .valid(...Object.values(enums.STATUS_ENUM))
      .default(enums.STATUS_ENUM.HOMELESS),
    photo: Joi.string().default(null),
    location: Joi.string()
      .valid(...Object.values(enums.CITY_ENUM))
      .default(enums.CITY_ENUM.KYIV),
  });

  return schema.validate(data);
};

module.exports = catValidator;
