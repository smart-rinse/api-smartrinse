import Users from "../models/userModel.js";
import Laundry from "../models/laundryModel.js";
import Review from "../models/reviewModel.js";
import Sequelize from "sequelize";
import {Op} from 'sequelize';

export const getLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "alamat", "jam_operasional", "photo"],
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Laundry fetched successfully",
      laundry,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLaundryBySentiment = async (req, res) => {
  try {
    const laundry =  await Laundry.findAll({
      attributes: ["id", "nama_laundry", "alamat", "jam_operasional", "photo"],
      order: [['average_sentiment', 'DESC']],
      limit: 5,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: 'Laundry fetched successfully',
      laundry,
    });
  } catch (error) {
    console.log(error);
    
  }
}


export const getLaundryById = async (req, res) => {
  const laundryId = req.params.id;
  try {
    const laundry = await Laundry.findByPk(laundryId, {
      attributes: ["id", "nama_laundry", "tanggal_berdiri", "alamat", "latitude", "longitude", "jam_operasional", "photo", "average_rating"],
      include: [
        {
          model: Review,
          as: "reviews",
          attributes: ["id", "content", "rating"],
          include: [
            {
              model: Users,
              as: "user",
              attributes: ["name", "photo"],
            },
          ],
        },
      ],
    });
    if (!laundry)
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "Laundry not found",
      });
    const reviews = laundry.reviews;
    const formattedReviews = reviews.map(({ id, content, rating, user }) => {
      return {
        id,
        content,
        rating,
        name: user.name,
        photo: user.photo
      };
    });
    const response = {
      success: true,
      statusCode: res.statusCode,
      message: "Laundry fetched successfully",
      laundry: {
        ...laundry.toJSON(),
        reviews: formattedReviews,
      },
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createLaundry = async (req, res) => {
  const userId = req.user.userId;
  const { nama_laundry, tanggal_berdiri, alamat, latitude, longitude, jam_operasional } = req.body;
  let imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }
  if (!nama_laundry || !tanggal_berdiri || !alamat || !latitude || !longitude || !jam_operasional)
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Please complete input data",
    });

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    const laundry = await Laundry.create({
      nama_laundry,
      tanggal_berdiri,
      alamat,
      latitude,
      longitude,
      jam_operasional,
      photo: imageUrl,
      userId,
    });

    user.isLaundry = true;
    await user.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Laundry created successfully",
      laundry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: {
        message: error.message,
      },
    });
  }
};

export const searchLaundry = async (req, res) => {
  let { keyword } = req.query;
  try {
    const laundry = await Laundry.findAll({
      where: {
        nama_laundry: {
          [Sequelize.Op.like]: `%${keyword}%`,
        },
      },
      attributes: ["id", "nama_laundry", "alamat", "jam_operasional", "photo"],
    });
    res.json({
      success: true,
      message: "Laundry search results",
      keyword: keyword,
      laundry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for laundry",
    });
  }
};

export const filterLaundryByRating = async (req, res) => {
  let { rating } = req.query;
  try {
    let whereClause = {};
    if (rating) {
      const minRating = parseInt(rating);
      const maxRating = minRating + 0.9;
      whereClause = {
        average_rating: {
          [Sequelize.Op.between]: [minRating, maxRating],
        },
      };
    }
    const laundry = await Laundry.findAll({
      where: whereClause,
      attributes: ["id", "nama_laundry", "alamat", "jam_operasional", "photo"],
    });
    res.json({
      success: true,
      message: "Laundry search results",
      rating: rating,
      laundry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for laundry",
    });
  }
};

