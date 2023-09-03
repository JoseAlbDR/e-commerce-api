// import Joi from "joi";

// export const validateJobFilters = (query: unknown) => {
//   const querySchema = Joi.object<IJobQuery>({
//     search: Joi.string().label("Name"),
//     status: Joi.string(),
//     jobType: Joi.string(),
//     sort: Joi.string(),
//     page: Joi.number(),
//     limit: Joi.number(),
//   });
//   return querySchema.validate(query, {
//     errors: { wrap: { label: false } },
//     messages: {
//       "object.unknown": "Unknown parameter: {#key}",
//       "any.invalid": "Not Allowed Values: {#invalidValues}.",
//       "string.pattern.base": "Invalid syntax for numeric condition: {#value}",
//     },
//   });
// };

import Joi from "joi";
import { ILogin } from "../types/errorInterfaces";

export const validateLogin = (query: unknown) => {
  const loginSchema = Joi.object<ILogin>({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(query, {
    errors: { wrap: { label: false } },
    messages: {
      "object.unknown": "Unknown parameter: {#key}",
      "any.required": "Please provide {#key}",
    },
  });
};
