import Joi from "joi";

// // Joi schema for validation
// Joi.defaults((schema) => {
//   return schema.options({
//     // Disable the built-in TLD list validation
//     tlds: false,
//   });
// });
const Userschema = Joi.object({
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
  const { error } = Userschema.validate(values, { abortEarly: false });
  if (!error) return {};

  return error.details.reduce((errors, { path, message }) => {
    const [key] = path;
    return { ...errors, [key]: message };
  }, {});
}

const Productschema = Joi.object({
  productName: Joi.string().required().messages({
    "string.empty": "Product Name is required",
    "any.required": "Product Name is required",
  }),
  productPrice: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  productCategory: Joi.string().required().messages({
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),
  productBrandName: Joi.string().required().messages({
    "string.empty": "Brand Name is required",
    "any.required": "Brand Name is required",
  }),
});

// Function to validate Product form values using Joi schema
export function validateProductFormValues(values) {
  const { error } = Productschema.validate(values, { abortEarly: false });
  if (!error) return {};

  return error.details.reduce((errors, { path, message }) => {
    const [key] = path;
    return { ...errors, [key]: message };
  }, {});
}

const ContactvalidationSchema = Joi.object({
  name: Joi.string().required().pattern(new RegExp("^[a-zA-Z\\s]+$")).messages({
    "string.empty": "Name is required",
    "string.pattern.base": "Invalid name: Only alphabets and spaces allowed"
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required"
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is required"
  })
});

// Function to validate Product form values using Joi schema
export function validateContactFormValues(values) {
  const { error } = ContactvalidationSchema.validate(values, { abortEarly: false });
  if (!error) return {};

  return error.details.reduce((errors, { path, message }) => {
    const [key] = path;
    return { ...errors, [key]: message };
  }, {});
}





