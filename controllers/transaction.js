import Service from "../models/serviceModel.js";
import Transaction from "../models/transactionModel.js";
import TransactionService from "../models/transactionServiceModel.js";
import Laundry from "../models/laundryModel.js";
import Users from "../models/userModel.js";
import moment from 'moment-timezone';

export const createTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const laundryId = req.params.id;
    const serviceData = req.body.serviceData;

    if (!serviceData || !serviceData.length) {
      return res.status(400).json({
        success: false,
        message: "Data service tidak valid",
      });
    }

    const services = await Promise.all(
      serviceData.map(async (data) => {
        const service = await Service.findByPk(data.serviceId);
        return {
          ...service.toJSON(),
          quantity: data.quantity || 1,
        };
      })
    );

    const transaction = await Transaction.create({
      userId,
      laundryId,
      transactionDate:  moment().tz('Asia/Jakarta').toDate(),
      status: "In Progress",
    });

    const transactionServices = await Promise.all(
      services.map((service) =>
        TransactionService.create({
          serviceId: service.id,
          transactionId: transaction.id,
          quantity: service.quantity,
        })
      )
    );

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dibuat",
      transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: TransactionService,
          include: [Service],
        },
        {
          model: Laundry,
          include: [
            {
              model: Users,
              as: "user",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    const totalCost = transaction.TransactionServices.length > 0 ? transaction.TransactionServices.reduce((total, transactionService) => total + transactionService.Service.price * transactionService.quantity, 0) : 0;

    const formattedTransaction = {
      transactionNumber: transaction.id,
      transactionDate: transaction.transactionDate,
      nama_laundry: transaction.laundry?.nama_laundry,
      rekening: transaction.laundry?.rekening,
      owner: transaction.laundry?.user?.name,
      pembeli: req.user.name,
      status: transaction.status,
      totalCost,
      services: transaction.TransactionServices.map((transactionService) => ({
        serviceName: transactionService.Service.jenis_service,
        quantity: transactionService.quantity,
        price: transactionService.Service.price,
      })),
    };

    return res.json({
      success: true,
      message: "Transaksi berhasil ditemukan",
      transaction: formattedTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getTransactionByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Transaction,
          attributes: ["id", "transactionDate", "status"],
          include: [
            {
              model: Laundry,
              include: [
                {
                  model: Users,
                  as: "user",
                  attributes: ["name"],
                },
              ],
            },
            {
              model: TransactionService,
              include: [Service],
            },
          ],
          order: [["transactionDate", "DESC"]],
        },
      ],

    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    const userTransaction = user.Transactions.map((transaction) => {
      const totalCost = transaction.TransactionServices.length > 0 ? transaction.TransactionServices.reduce((total, transactionService) => total + transactionService.Service.price * transactionService.quantity, 0) : 0;

      return {
        idTransaction: transaction.id,
        dateTransaction: transaction.transactionDate,
        status: transaction.status,
        totalCost: totalCost,
      };
    });

    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Transaksi pengguna berhasil ditemukan",
      userTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
