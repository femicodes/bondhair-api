import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import CollectionController from '../controllers/collection';
import { addCollectionSchema, getCollectionSchema } from './schema';

const collectionRoute = Router();

collectionRoute.get('/collections', CollectionController.getAllCollections);
collectionRoute.get('/collections/:id', validateRequest(getCollectionSchema), CollectionController.getOneCollection);
collectionRoute.post('/collections', validateRequest(addCollectionSchema), CollectionController.addCollection);

export default collectionRoute;
