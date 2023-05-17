import Laundry from "../models/laundryModel.js";

export const getLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "kota", "photo"],
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
      attributes: ["id", "nama_laundry", "tanggal_berdiri", "kota", "latitude", "longitude", "photo"],
    });
    if (!laundry)
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "Laundry tidak ditemukan",
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

export const laundry = async (req, res) => {
  const { nama_laundry, tanggal_berdiri, kota, latitude, longitude } = req.body;
  var imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }
  if (!nama_laundry || !tanggal_berdiri || !kota || !latitude || !longitude)
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Please complete input data",
    });

  try {
    await Laundry.create({
      nama_laundry,
      tanggal_berdiri,
      kota,
      latitude,
      longitude,
      photo: imageUrl,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
