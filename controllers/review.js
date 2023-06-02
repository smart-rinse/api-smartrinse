import Laundry from "../models/laundryModel.js";
import Review from "../models/reviewModel.js";
import Users from "../models/userModel.js";
import axios from "axios";

export const createReview = async (req, res) => {
  const userId = req.user.userId;
  const laundryId = req.params.id;
  const content = req.body.text;
  const { rating } = req.body;

  try {
    // Cek apakah Laundry dengan ID tersebut ada
    const laundry = await Laundry.findByPk(laundryId);
    if (!laundry) {
      return res.status(404).json({
        success: false,
        message: "Laundry not found",
      });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }

    const response = await axios.post("https://api-smartrinse-ml-fkkhrt32qa-uc.a.run.app/predict", { text: content });

    // Buat review baru dengan data yang diberikan
    const review = await Review.create({
      content,
      rating,
      laundryId,
      userId,
      sentiment: response.data.Hasil,
    });

    const reviews = await Review.findAll({ where: { laundryId } });
    let totalRating = 0;
    let totalSentiment = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
      totalSentiment += review.sentiment;
    });

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    const averageSentiment = reviews.length > 0 ? totalSentiment / reviews.length : 0;
    await Laundry.update(
      {
        average_rating: isNaN(averageRating) ? 0 : averageRating,
        average_sentiment: isNaN(averageSentiment) ? 0 : averageSentiment,
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
        // Menambahkan nama pengguna ke respons review
        userName: user.name,
        sentiment: response.data.Hasil,
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
