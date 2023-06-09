import Laundry from "../models/laundryModel.js";
import Service from "../models/serviceModel.js";
import Users from "../models/userModel.js";

export const createService = async (req, res) => {
  const userId = req.user.userId;
  const laundryId = req.params.id;
  const { jenis_service, price } = req.body;
  try {
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
    const service = await Service.create({
      jenis_service,
      price,
      userId,
      laundryId,
    });
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
