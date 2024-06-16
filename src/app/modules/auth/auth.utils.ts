import Jwt from 'jsonwebtoken';
import config from '../../config';
const createToken = (JwtPayload: { userId: string; role: string }) => {
  return Jwt.sign(JwtPayload, config.jwt_secret as string, {
    expiresIn: '10d',
  });
};
const refreshToken = (JwtPayload: { userId: string; role: string }) => {
  return Jwt.sign(JwtPayload, config.jwt_refresh_token as string, {
    expiresIn: '40d',
  });
};

export const authUtils = {
  createToken,
  refreshToken,
};
