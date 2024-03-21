import Joi from "joi";

// // Joi schema for validation
// Joi.defaults((schema) => {
//   return schema.options({
//     // Disable the built-in TLD list validation
//     tlds: false,
//   });
// });
const schema = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required().messages({
    "string.pattern.base": "Invalid name: Only alphabets allowed",
    "any.required": "Name is required",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Please enter password",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.required": "Please confirm password",
    "any.only": "Passwords must match",
  }),
});

// Function to validate form values using Joi schema
export function validateFormValues(values) {
  const { error } = schema.validate(values, { abortEarly: false });
  if (!error) return {};

  return error.details.reduce((errors, { path, message }) => {
    const [key] = path;
    return { ...errors, [key]: message };
  }, {});
}
