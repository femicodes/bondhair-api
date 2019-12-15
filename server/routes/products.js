import { Router } from 'express';
import multer from 'multer';
import { validateRequest } from '../middleware/validateRequest';
import ProductController from '../controllers/product';
import { getProductSchema } from './schema';

const productRoute = Router();

productRoute.get('/products', ProductController.getAllProducts);
productRoute.get('/products/:id', validateRequest(getProductSchema), ProductController.getOneProduct);
productRoute.post('/products/:collectionId', multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('hair'), ProductController.addProduct);

export default productRoute;
