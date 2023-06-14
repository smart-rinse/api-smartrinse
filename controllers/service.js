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
      service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editService = async (req, res) => {
  const { id } = req.params;
  const { jenis_service, price } = req.body;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        status: false,
        statusCode: res.statusCode,
        message: "Service Not Found",
      });
    }
    await service.update({
      jenis_service,
      price,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Success",
      service,
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
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        status: false,
        statusCode: res.statusCode,
        message: "Service Not Found",
      });
    }
    await service.destroy();
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Service removed successfully",
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
};

export const getAllService = async (req, res) => {
  const idLaundry = req.params.id;
  const ownerId = req.owner.ownerId;

  try {
    const laundry = await Laundry.findByPk(idLaundry, {
      include: {
        model: Service,
        attributes: ['jenis_service', 'price'],
      },
    });

    if (!laundry) {
      return res.status(404).json({
        success: false,
        message: 'Laundry tidak ditemukan',
      });
    }

    if (laundry.ownerId !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "Owner does not have access to this laundry",
      });
    }

    const services = laundry.Services;
    const formattedServices = services.map(({ jenis_service, price }) => ({
      jenis_service,
      price,
    }));

    return res.json({
      success: true,
      message: 'Data layanan ditemukan',
      data: formattedServices,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
    });
  }
};
