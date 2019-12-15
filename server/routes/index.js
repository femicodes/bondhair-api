import { Router } from 'express';
import collectionRoute from './collections';
import productRoute from './products';

const router = Router();

router.use('/', collectionRoute);
router.use('/', productRoute);

export default router;
