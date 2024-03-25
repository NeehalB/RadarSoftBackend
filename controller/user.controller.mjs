import userModel from "../model/user.model.mjs";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userData = new userModel({
      name: name,
      email: email,
      password: password,
    });

    userData.save();

    if (userData) {
      return res.status(200).json({
        message: "User added successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userModel.findOne({ email: email });

    if (!userData) {
      return res.status(400).json({
        message: "User doesn't exist.",
      });
    }

    if (!(password === userData.password)) {
      return res.status(400).json({
        message: "Invalid credential.",
      });
    }

    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      process.env.SECRET_KEY,
      { expiresIn: "7h" }
    );

    // const splitToken = token.split(".")[1];

    // console.log(atob(splitToken));

    return res.status(200).json({
      token: token,
      message: "Logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
