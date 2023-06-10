import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Laundry from "../models/laundryModel.js";
import Owner from "../models/ownerModel.js";

export const getOwners = async (req, res) => {
  const ownerId = req.owner.ownerId;
  try {
    const owners = await Owner.findAll({
      attributes: ["id", "name", "email", "isLaundry"],
    });
    const owner = await Owner.findByPk(ownerId);
    const remainingLaundries = await Laundry.count({ where: { ownerId } });
    if (remainingLaundries === 0) {
      owner.isLaundry = false;
      await owner.save();
    }
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Owner fetched successfully",
      owners,
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: res.statuscode,
      error: {
        message: error.message,
        uri: req.originalUrl,
      },
    });
    console.log(error);
  }
};

export const getOwnerById = async (req, res) => {
  const ownerId = req.params.id;
  try {
    const owner = await Owner.findByPk(ownerId, {
      attributes: ["id", "name", "email", "telephone", "gender", "city", "isLaundry", "photo"],
    });
    const remainingLaundries = await Laundry.count({ where: { ownerId } });
    if (remainingLaundries === 0) {
      owner.isLaundry = false;
      await owner.save();
    }
    if (!owner)
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "Owner not found",
      });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Owner fetched successfully",
      owner,
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: res.statuscode,
      error: {
        message: error.message,
        uri: req.originalUrl,
      },
    });
    console.log(error);
  }
};

export const RegisterOwner = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  const owner = await Owner.findOne({
    where: {
      email: email,
    },
  });
  if (!name || !email || !password || !confPassword)
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Please complete input data!",
    });
  const emailRegex = /@gmail\.(com|id)$/i; 
  if (!emailRegex.test(email))
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Invalid email format!",
    });
  if (owner)
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Your email has been registered!",
    });
  if (password !== confPassword)
    return res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: "Password and Confirm Password do not match!",
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Owner.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Owner Created",
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: res.statuscode,
      error: {
        message: error.message,
        uri: req.originalUrl,
      },
    });
    console.log(error);
  }
};

export const LoginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findAll({
      where: {
        email: email,
      },
    });
    const match = await bcrypt.compare(password, owner[0].password);
    if (!match)
      return res.status(400).json({
        success: false,
        statusCode: res.statusCode,
        message: "Password Wrong!",
      });
    const ownerId = owner[0].id;
    const isLaundry = owner[0].isLaundry;
    const name = owner[0].name;
    const emailId = owner[0].email;
    const accessToken = jwt.sign({ ownerId, name, emailId }, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign({ ownerId, name, emailId }, process.env.REFRESH_TOKEN_SECRET);
    await Owner.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: ownerId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "success",
      data: {
        ownerId,
        isLaundry,
        name,
        email,
        accessToken,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: res.statuscode,
      error: {
        message: "Email Not Found",
        uri: req.originalUrl,
      },
    });
  }
};

export const LogoutOwner = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const owner = await Owner.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!owner[0]) return res.sendStatus(204);
  const ownerId = owner[0].id;
  await Owner.update(
    { refresh_token: null },
    {
      where: {
        id: ownerId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.json({
    success: true,
    statusCode: res.statusCode,
    message: "Logout success",
  });
};

export const changePasswordOwner = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "Owner not found",
      });
    }
    const match = await bcrypt.compare(currentPassword, owner.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        statusCode: res.statusCode,
        message: "Current password is incorrect",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        statusCode: res.statusCode,
        message: "New password and confirm password do not match",
      });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await owner.update({
      password: hashPassword,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: res.statusCode,
      error: {
        message: error.message,
        uri: req.originalUrl,
      },
    });
    console.log(error);
  }
};

export const editOwner = async (req, res) => {
  const { id } = req.params;
  const { telephone, gender, city } = req.body;
  let imageUrl = "";
  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }
  try {
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "Owner not found",
      });
    }
    await owner.update({
      telephone,
      gender,
      city,
      photo: imageUrl,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Success",
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
