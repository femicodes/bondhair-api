import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import ProductController from '../controllers/product';
import { addProductSchema, getProductSchema } from './schema';
import Product from '../models/Product';

const productRoute = Router();

productRoute.get('/products', ProductController.getAllProducts);
productRoute.get('/products/:id', validateRequest(getProductSchema), ProductController.getOneProduct);
productRoute.post('/products/:collectionId', validateRequest(addProductSchema), ProductController.addProduct);

export default productRoute;
