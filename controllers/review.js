import Laundry from "../models/laundryModel.js";
import Review from "../models/reviewModel.js";
import Users from "../models/userModel.js";
import axios from "axios";

export const createReview = async (req, res) => {
  const userId = req.user.userId;
  const laundryId = req.params.id;
  const { rating, content } = req.body;
  try {
    const [laundry, user] = await Promise.all([
      Laundry.findByPk(laundryId),
      Users.findByPk(userId)
    ]);
    if (!laundry) {
      return res.status(404).json({
        success: false,
        message: "Laundry not found",
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    const response = await axios.post("https://api-smartrinse-ml-oqy2ejn27a-et.a.run.app/predict", { content });
    const review = await Review.create({
      content,
      rating,
      laundryId,
      userId,
      sentiment: response.data.sentiment,
    });
    const reviews = await Review.findAll({ where: { laundryId } });
    let totalRating = 0;
    let totalSentiment = 0;
    for (const review of reviews) {
      totalRating += review.rating;
      if (review.content) {
        totalSentiment += review.sentiment;
      }
    }
    const filteredReviews = reviews.filter(review => review.rating);
    const filteredSentimentReviews = reviews.filter(review => review.content);
    const averageRating = filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0;
    const averageSentiment = filteredSentimentReviews.length > 0 ? totalSentiment / filteredSentimentReviews.length : 0;
    await Laundry.update(
      {
        average_rating: isNaN(averageRating) ? 0 : averageRating,
        average_sentiment: isNaN(averageSentiment) ? 0 : averageSentiment,
        count_reviews: reviews.length
      },
      { where: { id: laundry.id } }
    );
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: {
        id: review.id,
        content: review.content,
        rating: review.rating,
        laundryId: review.laundryId,
        userId: review.userId,
        photo: user.photo,
        userName: user.name,
        sentiment: review.sentiment
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
