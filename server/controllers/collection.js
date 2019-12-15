import Collection from '../models/Collection';
import Response from '../utils/Response';

class CollectionController {
  static async addCollection(req, res) {
    try {
      const collection = req.body;

      const checkCollection = await Collection.findOne({ name: collection.name });
      if (checkCollection) return Response.error(res, 409, 'Collection already exists');

      const newCollection = new Collection(collection);
      await newCollection.save();

      return Response.success(res, 201, 'Collection created!', newCollection);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }

  static async getAllCollections(req, res) {
    try {
      const collections = await Collection.find();

      return Response.success(res, 200, 'Collections returned!', collections);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }

  static async getOneCollection(req, res) {
    try {
      const { id } = req.params;
      const collection = await Collection.findById(id);
      if (!collection) return Response.error(res, 404, 'Collection doesn\'t exist');

      return Response.success(res, 200, 'Collection retrieved', collection);
    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }
}

export default CollectionController;
