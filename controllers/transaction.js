import Service from "../models/serviceModel.js";
import Transaction from "../models/transactionModel.js";
import TransactionService from "../models/transactionServiceModel.js";
import {generateTransactionNumber} from "../helper/utils.js"
import Laundry from "../models/laundryModel.js";
import Users from "../models/userModel.js";

export const createTransaction = async (req, res) => {
    try {
      const userId = req.user.userId;
      const laundryId = req.params.id;
      const serviceData = req.body.serviceData;
  
      if (!serviceData || !serviceData.length) {
        return res.status(400).json({
          success: false,
          message: 'Data service tidak valid',
        });
      }
  
      const services = await Promise.all(
        serviceData.map(async (data) => {
          const service = await Service.findByPk(data.serviceId);
          return {
            ...service.toJSON(),
            quantity: data.quantity || 1, // Jika tidak ada quantity yang dikirimkan, gunakan default 1
          };
        })
      );
  
    //   const transactionNumber = generateTransactionNumber();
  
      const transaction = await Transaction.create({
        userId,
        laundryId,
        // transactionNumber,
        transactionDate: new Date().toISOString(),
      });
  
      const transactionServices = await Promise.all(
        services.map((service) =>
          TransactionService.create({
            serviceId: service.id,
            // transactionNumber,
            transactionId: transaction.id,
            quantity: service.quantity,
          })
        )
      );
  
      res.status(201).json({
        success: true,
        message: 'Transaksi berhasil dibuat',
        transaction,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
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
          },{
            model: Laundry,
            include: [{
                model: Users,
                as : 'user',
                attributes: ["name"],
            }]
          }
        ],
      });
  
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: 'Transaksi tidak ditemukan',
        });
      }
  
      const totalCost = transaction.TransactionServices.length > 0
        ? transaction.TransactionServices.reduce((total, transactionService) =>
            total + transactionService.Service.price * transactionService.quantity,
            0
          )
        : 0;
  
      const formattedTransaction = {
        // transactionNumber: transaction.transactionNumber,
        transactionNumber: transaction.id,
        transactionDate: transaction.transactionDate,
        nama_laundry: transaction.laundry?.nama_laundry,
        rekening: transaction.laundry?.rekening,
        owner: transaction.laundry?.user?.name,
        pembeli:req.user.name,
        totalCost,
        services: transaction.TransactionServices.map((transactionService) => ({
          serviceName: transactionService.Service.jenis_service,
          quantity: transactionService.quantity,
          price: transactionService.Service.price,
        })),
      };
  
      return res.json({
        success: true,
        message: 'Transaksi berhasil ditemukan',
        transaction: formattedTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };
  