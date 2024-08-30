import { Request, Response } from "express";
import { UserDocument, UserModel } from "../models/User";
import buildError from "../lib/utils/buildError";
import { handleError } from "../lib/utils/handleError";
import buildResponse from "../lib/utils/buildResponse";
import { StatusCodes } from "../lib/utils/statusCodes";
import dayjs from "dayjs";
import authService from "../lib/services/authServices";
import { DOMAIN, NODE_ENV } from "../lib/constants";
import { JwtSubject } from "../@types";
import { getInitData } from "../routes/userRoutes";

// @desc    Get all users
// @route   GET /users
// @access  Public
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("userrrrr", getInitData(res));

    const users: UserDocument[] = await UserModel.find();
    buildResponse(res, users);
  } catch (err: any) {
    handleError(res, {
      moreInfo: err.message,
    });
  }
};

// @desc    Get all users
// @route   GET /user
// @access  Public
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: UserDocument | null = await UserModel.findById(req.query);
    if (user?._id) {
      buildResponse(res, user);
    } else {
      buildError(StatusCodes.NOT_FOUND, "User not found");
    }
  } catch (err: any) {
    handleError(res, err);
  }
};

// @desc    Create a new user
// @route   POST /user
// @access  Public
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user: UserDocument = new UserModel(req.body);
    await user.save();
    buildResponse(res, user);
  } catch (err: any) {
    handleError(res, err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user, auth_date } = authService.validateMiniAppInitData(
      req.body.initDataRaw
    );

    // Validate session expiration
    if (
      !auth_date ||
      (dayjs.unix(auth_date).isBefore(dayjs().subtract(1, "minute")) &&
        NODE_ENV !== "development")
    ) {
      buildError(StatusCodes.BAD_REQUEST, "Invalid session");
      return;
    }

    if (!user) {
      buildError(StatusCodes.BAD_REQUEST, "User data is missing");
      return;
    }

    const updatedUser = await authService.getOrCreateUser(user as JwtSubject);
    if (updatedUser) {
      const jwt = await authService.createAccessToken({
        id: user.id,
        first_name: user.first_name,
        username: user.username,
        is_premium: user?.is_premium,
        language_code: user?.language_code,
        allows_write_to_pm: user?.allows_write_to_pm,
        start_param: user?.start_param,
        photoUrl: user?.photoUrl,
      });

      res.cookie("miniapp_jwt", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 1,
        domain: DOMAIN,
        sameSite: "none",
      });
      buildResponse(res, { user: updatedUser, token: jwt });
    }
  } catch (err: any) {
    handleError(res, err);
  }
};
