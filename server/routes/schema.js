import Joi from '@hapi/joi';

export const addCollectionSchema = {
  body: {
    name: Joi.string().required(),
  },
};

export const getCollectionSchema = {
  params: {
    id: Joi.string().alphanum().required(),
  },
};


export const addProductSchema = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
  },
  params: {
    collectionId: Joi.string().alphanum().required(),
  },
};

export const getProductSchema = {
  params: {
    id: Joi.string().alphanum().required(),
  },
};
