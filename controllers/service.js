import Laundry from "../models/laundryModel.js";
import Owner from "../models/ownerModel.js";
import Service from "../models/serviceModel.js";

export const createService = async (req, res) => {
  const ownerId = req.owner.ownerId;
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
    const owner = await Owner.findByPk(ownerId);
    if (!owner) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }
    if (laundry.ownerId !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "Owner does not have access to this laundry",
      });
    }
    const service = await Service.create({
      jenis_service,
      price,
      ownerId,
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
