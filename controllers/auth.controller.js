import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //logic to create a new user
    const { name, email, password } = req.body;
    //check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user document
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session: session }
    );
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success:true,
      message: "User created successfully",
      data:{
        user:newUsers[0],
        token,
      } 
    })
  } catch (error) {
    await session.abortTransaction();
    session.endSession();next(error);
  }
};

export const signIn = async (req, res, next) => {
  try{
      const { email, password } = req.body;
      //check if the user exists
      const user =await User.findOne({email})
      if(!user){
        const error = new Error("User does not exist");
        error.statusCode = 404;
        throw error;
      }
      //compare the hashed password
      const isPasseordValid = await bcrypt.compare(password, user.password);
      if(!isPasseordValid){
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
      }
      //generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
          user,
          token,
        },
      });
  }catch(error){
    next(error);
  }

};

export const signOut = async (req, res, next) => {};
