import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Laundry from "../models/laundryModel.js";

export const getUsers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "isLaundry"],
    });
    const user = await Users.findByPk(userId)
    const remainingLaundries = await Laundry.count({ where: { userId } });
    if (remainingLaundries === 0) {
      user.isLaundry = false;
      await user.save();
    }
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Users fetched successfully",
      users,
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

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId, {
      attributes: ["id", "name", "email", "telephone", "gender", "city", "isLaundry"],
    });
    const remainingLaundries = await Laundry.count({ where: { userId } });
    if (remainingLaundries === 0) {
      user.isLaundry = false;
      await user.save();
    }
    if (!user)
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "User not found",
      });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Users fetched successfully",
      user,
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

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  const user = await Users.findOne({
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
  if (user)
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
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "User Created",
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

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findAll({
      where: {
        email: email,
      },
    });
    const match = await bcrypt.compare(password, user[0].password);
    if (!match)
      return res.status(400).json({
        success: false,
        statusCode: res.statusCode,
        message: "Password Wrong!",
      });
    const userId = user[0].id;
    const isLaundry = user[0].isLaundry;
    const name = user[0].name;
    const emailId = user[0].email;
    const accessToken = jwt.sign({ userId, name, emailId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });
    const refreshToken = jwt.sign({ userId, name, emailId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
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
        userId,
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

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
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

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(currentPassword, user.password);
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
    await user.update({
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

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { telephone, gender, city } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "User not found",
      });
    }
    await user.update({
      telephone,
      gender,
      city,
    });
    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Success",
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
