import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mohammadahmed.kips@gmail.com",
    pass: "ixurzaonkmculdtp"
  }
});

const secret = "test";

//login
export const login = async (req, res) => {
  const {username, password, deviceToken} = req.body || {};
  try {
    const oldUser = await User.findOne({username});

    if (!oldUser) return res.status(404).json({message: "User doesn't exist"});
    oldUser.deviceToken = deviceToken || "";
    await oldUser.save();
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

    const token = jwt.sign({username: oldUser.username, id: oldUser._id}, secret, {expiresIn: "1h"});

    res.status(200).json({result: oldUser, token});
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
    console.log(err);
  }
};
// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

export const requestForgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    if (!email) {
      return res.sendJson(0, 404, "Please Send Your email Number", null);
    }
    var otp = generateOTP();
    let user = await User.findOne({email: email});
    if (user) {
      const updatedOtp = await User.updateOne(
        {_id: user._id},
        {
          $set: {
            otp: otp
          }
        }
      );
      const mailOptions = {
        from: "GCUSocietyHub@gmail.com",
        to: user.email, // Join recipients with a comma and space
        subject: "Forgot Password GCU Society Hub",
        text: `Your Forgot Password Otp is ${otp}. Please Dont Share with anyone.`
      };
      if (updatedOtp) {
        try {
          const info = await transporter.sendMail(mailOptions);
          res.status(201).json({info});
        } catch (error) {
          res.status(404).json({error: "Email sending Failed."});
        }
      }
    }
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error!"});
  }
};

export const verifyOTP = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;

  try {
    if (!otp || !email) {
      return res.status(404).json({error: "Please Send Your Details Correctly"});
    }
    let user = await User.findOne({email: email}).lean();
    if (user) {
      if (user.otp == otp) {
        return res.status(200).json({success: "Otp Verified Successfully"});
      } else {
        return res.status(400).json({success: "Wrong Otp"});
      }
    } else {
      return res.status(400).json({success: "User not Found "});
    }
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error!"});
  }
};

export const createNewPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const otp = req.body.otp;
  try {
    if (!email || !password) {
      return res.status(404).json({error: "Please Send Your Details Correctly"});
    }
    let user = await User.findOne({email: email}).lean();
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      if (otp == user.otp) {
        const updatedPassword = await User.updateOne(
          {email: email},
          {
            $set: {
              password: newPassword
            }
          }
        );
        return res.status(200).json({success: "Passwrod Updated Successfully"});
      } else {
        return res.status(400).json({error: "Invalid OTP provided"});
      }
    } else {
      return res.status(400).json({error: "User not Found "});
    }
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error!"});
  }
};

//creating user/signup
export const createUser = async (req, res) => {
  const {name, username, password, email, cnic, phoneNumber, designation, roles, department} = req.body;

  try {
    const oldUser = await User.findOne({username});

    if (oldUser) return res.status(400).json({message: "User already exists"});

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      cnic,
      phoneNumber,
      designation,
      roles,
      department
    });

    res.status(201).json({result});
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});

    console.log(error);
  }
};

//Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});

    console.log(error);
  }
};

//update user
export const updateUser = async (req, res) => {
  const {id: _id} = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No user with that id");

  const updatedUser = await User.findByIdAndUpdate(_id, {...user}, {new: true});

  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with that id");

  await User.findByIdAndRemove(id);

  res.json({message: "User deleted successfully!"});
};

export const updateUserRoles = async (req, res) => {
  const {username} = req.params;
  const {role, oldUsername} = req.body;

  if (oldUsername && username !== oldUsername) {
    let oldUser = await User.findOne({username: oldUsername});
    if (oldUser.roles.includes(role)) {
      const index = oldUser.roles.indexOf(role);
      if (index > -1) {
        oldUser.roles.splice(index, 1);
      }
      await User.findByIdAndUpdate(oldUser._id, oldUser, {new: true});
    }
  }

  let user = await User.findOne({username: username});

  if (!user) return res.status(404).send("No user with that username");

  if (!user.roles.includes(role)) {
    let roles = user.roles.push(role);
    let _id = user._id;

    await User.findByIdAndUpdate(_id, {...user, roles: roles, _id}, {new: true});

    const users = await User.find();

    res.status(200).json(users);
  } else {
    res.json({message: "User already have this role!"});
  }
};

export const deleteUserRoles = async (req, res) => {
  const {username} = req.params;
  const {role} = req.body;

  let oldUser = await User.findOne({username: username});

  if (oldUser.roles.includes(role)) {
    const index = oldUser.roles.indexOf(role);
    if (index > -1) {
      oldUser.roles.splice(index, 1);
    }
  }

  await User.findByIdAndUpdate(oldUser._id, oldUser, {new: true});

  const users = await User.find();

  res.status(200).json(users);
};
