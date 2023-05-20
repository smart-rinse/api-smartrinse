import Users from "../models/userModel.js";
import Laundry from "../models/laundryModel.js";

export const getLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "kota","jam_operasional", "photo"],
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

export const getLaundryById = async (req, res) => {
  const laundryId = req.params.id;
  try {
    const laundry = await Laundry.findByPk(laundryId, {
      attributes: ["id", "nama_laundry", "tanggal_berdiri", "kota", "latitude", "longitude","jam_operasional", "photo"],
    });
    if (!laundry)
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "Laundry not found",
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

export const createLaundry = async (req, res) => {
  const userId = req.user.userId; 
  const { nama_laundry, tanggal_berdiri, kota, latitude, longitude, jam_operasional } = req.body;
  let imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }
  if (!nama_laundry || !tanggal_berdiri || !kota || !latitude || !longitude || !jam_operasional)
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
      kota,
      latitude,
      longitude,
      jam_operasional,
      photo: imageUrl,
      userId
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
