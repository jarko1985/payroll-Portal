import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { verifyUser } from "../utils/verifyUser.js";
const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });

  if (!user) {
    response.json({ status: 404 }, { message: "User Does not Exist!!!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return response.json({ message: "Check your login Credentials!!" });
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  response.cookie("token", token, {
    httpOnly: true,
    maxAge: 360000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response.json({
    status: true,
    message: "Logged in Successfully!!",
    user,
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!!" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      text: `Click on the following link to reset your password: http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Error Sending Email!!" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Email sent successfully!" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error!" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id; // Extract the user ID from the token

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.json({
      success: true,
      message: "Password Updated Successfully!!",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Invalid or Expired Token!",
    });
  }
});
router.get("/verify", verifyUser, async (req, res) => {
  return res.json({ success: true, message: "Authorized User" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, message: "logged out Successfully" });
});

export { router as UserRouter };
