import fs from 'fs';
import { config } from 'dotenv';
import Product from '../models/Product';
import Collection from '../models/Collection';
import Response from '../utils/Response';
import { uploadSettings } from '../utils/fileUpload';

config();

class ProductController {
  static async addProduct(req, res) {
    try {
      const { collectionId } = req.params;

      const checkCollection = await Collection.findById(collectionId);
      if (!checkCollection) return Response.error(res, 409, 'Collection doesn\'t exist');

      const { name, description, brand, price } = req.body;

      const checkProduct = await Product.findOne({ name });
      if (checkProduct) return Response.error(res, 409, 'Product already exists');

      var params = {
        ACL: 'public-read',
        Bucket: process.env.AMAZON_BUCKET,
        Body: fs.createReadStream(req.file.path),
        Key: `hair/${req.file.originalname}`
      };

      uploadSettings(params, req.file.path);

      const photoUrl = `${process.env.BASE_URL}/${params.Key}`;
      const newProduct = await new Product({
        name, description, brand, price, hairPhoto: photoUrl,
      });

      await newProduct.save();
      await Collection.findByIdAndUpdate(collectionId, {
        $addToSet: { products: newProduct._id },
      }, { new: true });

      return Response.success(res, 201, 'Product created!', newProduct);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.find();

      return Response.success(res, 200, 'Products returned!', products);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }

  static async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) return Response.error(res, 404, 'Product doesn\'t exist');

      return Response.success(res, 200, 'Product retrieved!', product);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }
}

export default ProductController;
