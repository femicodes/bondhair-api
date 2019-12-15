import Joi from '@hapi/joi';
import Response from '../utils/Response';

export const validateRequest = (schema) => (req, res, next) => {
  const schemaEntries = Object.entries(schema);

  for (let i = 0; i < schemaEntries.length; i += 1) {
    const [key, val] = schemaEntries[i];
    if (req[key]) {
      const { error } = Joi.validate(req[key], val);

      if (error) {
        const { details } = error;
        Response.error(res, 400, details[0].message);
        return;
      }
    }
  }

  next();
};
