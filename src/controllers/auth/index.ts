import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../helpers";
import UserModel from "../../models/user";
import { validateSignIn, validateSignUp } from "../../validations/auth";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "it-jobs";



// Sign Up
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const body = validateSignUp(req.body);

    const exisitingUser = await UserModel.findOne({ email: body.email });

    if (exisitingUser) {
      throw new Error("User with this email already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = {
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: hashedPassword,
    };

    const createdUser = await UserModel.create(newUser);

    // create token
    const token = generateToken({ email: body.email }, SECRET_KEY, "10d");
    console.log(token)

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: createdUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Sign In
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = validateSignIn(req.body);

    const exisitingUser = await UserModel.findOne({ email: body.email });

    if (!exisitingUser) {
      throw new Error("User with this email not found");
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(body.password, exisitingUser.password);

    if (!isMatch) {
      throw new Error("Incorrect password!");
    }

    // Create token;
    const token = generateToken({ email: body.email }, SECRET_KEY, "10d");
    console.log(token)

    res.status(200).json({
      success: true,
      message: "You have successfully signed in.",
      data: {
        user: exisitingUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
