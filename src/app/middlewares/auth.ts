import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.constant';
import User from '../modules/user/user.model';
import { verifyToken } from '../modules/user/user.utils';
import tryCatchAsync from '../utils/tryCatchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return tryCatchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized');
    }
    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { role, userId } = decoded;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized');
    }
    if (user?.isBlocked) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Your account is blocked, you can not perform this action'
      );
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'you are not authorized to access this resource'
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
