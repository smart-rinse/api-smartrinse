import Laundry from "../models/laundryModel.js";
import Favorite from "../models/favoriteModel.js";

export const createFavoriteLaundry = async (req, res) => {
  try {
    const userId = req.user.userId;
    const laundryId = req.params.id;
    const laundry = await Laundry.findOne({ where: { id: laundryId } });
    if (!laundry) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Laundry Not Found",
      });
    }
    const existingFavorite = await Favorite.findOne({
      where: { userId, laundryId },
    });
    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Laundry already chosen as favorite",
      });
    }
    await Favorite.create({ userId, laundryId });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Laundry chosen as favorite successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLaundryByFavorite = async (req, res) => {
  try {
    const { userId } = req.user;
    const favoriteLaundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "alamat", "jam_buka","jam_tutup", "photo"],
      include: [
        {
          model: Favorite,
          where: { userId },
        },
      ],
    });
    const laundry = favoriteLaundry.map(({ id, nama_laundry, alamat, jam_buka,jam_tutup, photo }) => ({
      id,
      nama_laundry,
      alamat,
      jam_buka,
      jam_tutup,
      photo,
    }));
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Favorite laundry fetched successfully",
      laundry,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFavoriteLaundry = async (req, res) => {
    try {
      const  laundryId  = req.params.id;
      const userId = req.user.userId; 
      const laundry = await Laundry.findOne({ where: { id: laundryId } });
      if (!laundry) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Laundry not found',
        });
      }
      const favorite = await Favorite.findOne({ where: { userId, laundryId } });
      if (!favorite) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Laundry is not a favorite',
        });
      }
      await favorite.destroy(); 
      res.json({
        success: true,
        statusCode: res.statusCode,
        message: 'Favorite laundry removed successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  };
  