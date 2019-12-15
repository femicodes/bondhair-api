import Review from '../models/Review';
import Response from '../utils/Response';

class ReviewController {
  static async addReview(req, res) {
    try {
      const { productId } = req.params;

    } catch (error) {
      return Response.error(res, 500, error.message);
    }
  }
}

export default ReviewController;
