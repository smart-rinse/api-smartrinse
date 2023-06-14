import Users from "../models/userModel.js";
import Laundry from "../models/laundryModel.js";
import Review from "../models/reviewModel.js";
import Sequelize from "sequelize";
import Service from "../models/serviceModel.js";
import Owner from "../models/ownerModel.js";

export const getLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "alamat", "jam_buka", "jam_tutup", "photo", "average_rating", "average_sentiment"],
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
    const laundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "alamat", "jam_buka", "jam_tutup", "photo", "average_rating", "average_sentiment"],
      order: [["average_sentiment", "DESC"]],
      limit: 5,
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

export const getLaundryByOwner = async (req, res) => {
  const ownerId = req.owner.ownerId;

  try {
    const owner = await Owner.findByPk(ownerId, {
      include: [
        {
          model: Laundry,
          as : "laundryOwner",
          attributes: ["id", "nama_laundry", "tanggal_berdiri", "alamat", "latitude", "longitude", "jam_buka", "jam_tutup", "photo", "average_rating", "count_reviews", "rekening", "bank", "telephone"],
        }
      ]
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner tidak ditemukan",
      });
    }

    const laundry = owner.laundryOwner
    const formattedOwner = laundry.map(({ id, nama_laundry, tanggal_berdiri, alamat, latitude, longitude, jam_buka, jam_tutup, photo, average_rating, count_reviews, rekening, bank, telephone }) => {
      return {
        id,
        nama_laundry,
        tanggal_berdiri,
        alamat,
        latitude,
        longitude,
        jam_buka,
        jam_tutup,
        photo,
        average_rating,
        count_reviews,
        rekening,
        bank,
        telephone,
      };
    });

    return res.json({
      success: true,
      message: "Laundry ditemukan",
      data: formattedOwner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}

export const getLaundryById = async (req, res) => {
  const laundryId = req.params.id;
  try {
    const laundry = await Laundry.findByPk(laundryId, {
      attributes: ["id", "nama_laundry", "tanggal_berdiri", "alamat", "latitude", "longitude", "jam_buka", "jam_tutup", "photo", "average_rating", "count_reviews", "rekening", "bank", "telephone"],
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
    const services = await Service.findAll({
      where: {
        laundryId: laundryId,
      },
      attributes: ["id", "jenis_service", "price"],
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
        photo: user.photo,
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
      services,
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createLaundry = async (req, res) => {
  const ownerId = req.owner.ownerId;
  const { nama_laundry, tanggal_berdiri, alamat, latitude, longitude, jam_buka, jam_tutup, rekening, bank, telephone } = req.body;
  let imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }

  if ((!nama_laundry || !tanggal_berdiri || !alamat || !latitude || !longitude || !jam_buka || !jam_tutup || !telephone))
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Please complete input data",
    });

  try {
    const owner = await Owner.findByPk(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Owner not found",
      });
    }
    const laundry = await Laundry.create({
      nama_laundry,
      tanggal_berdiri,
      alamat,
      latitude,
      longitude,
      jam_buka,
      jam_tutup,
      rekening,
      bank,
      telephone,
      photo: imageUrl,
      ownerId,
    });

    owner.isLaundry = true;
    await owner.save();

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
      attributes: ["id", "nama_laundry", "alamat", "jam_buka", "jam_tutup", "photo"],
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
      attributes: ["id", "nama_laundry", "alamat", "jam_buka", "jam_tutup", "photo"],
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

export const editLaundry = async (req, res) => {
  const ownerId = req.owner.ownerId
  const { id } = req.params;
  const { nama_laundry, tanggal_berdiri, alamat, latitude, longitude, jam_buka, jam_tutup, rekening, bank, telephone } = req.body;
  let imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }

  try {
    const laundry = await Laundry.findByPk(id);

    if (!laundry) {
      return res.status(404).json({
        status: false,
        statusCode: res.statusCode,
        message: "Laundry Not Found",
      });
    }
    if (laundry.ownerId !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "Owner does not have access to this laundry",
      });
    }
    await laundry.update({
      nama_laundry,
      tanggal_berdiri,
      alamat,
      latitude,
      longitude,
      jam_buka,
      jam_tutup,
      rekening,
      bank,
      telephone,
      photo: imageUrl,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Success",
      laundry
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      statusCode: res.statusCode,
      error: {
        message: error.message,
        uri: req.originalUrl,
      },
    });
  }
}