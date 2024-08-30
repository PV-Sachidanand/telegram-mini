import { JwtPayload, JwtSubject } from "../../@types";
import { UserModel } from "../../models/User";
import {
  // createWebAppSecret,
  decodeInitData,
  InitData,
  // verifyTelegramWebAppInitData,
} from "../utils/auth.utils";
// import buildError from "../utils/buildError";
// import { StatusCodes } from "../utils/statusCodes";
import JWTServices from "./jwtServices";

class AuthService {
  validateMiniAppInitData(raw: string): InitData {
    const initData = decodeInitData(raw);
    // const secretKey = createWebAppSecret();

    // if (!verifyTelegramWebAppInitData(initData, secretKey)) {
    //   buildError(StatusCodes.BAD_REQUEST, "Invalid init data");
    // }

    return initData;
  }

  async createAccessToken(user: JwtPayload["sub"]): Promise<string> {
    const payload: JwtPayload = { sub: user };
    return JWTServices.generateToken(payload);
  }

  async getOrCreateUser(user: JwtSubject) {
    return UserModel.findOneAndUpdate(
      { _id: user.id },
      {
        $set: {
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          isPremium: user.is_premium,
          languageCode: user.language_code,
          allowsWriteToPm: user.allows_write_to_pm,
        },
      },
      {
        upsert: true,
        new: true,
      }
    ).lean();
  }
}
const authService = new AuthService();
export default authService;
