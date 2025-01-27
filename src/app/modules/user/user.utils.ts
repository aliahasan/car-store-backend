import jwt, { JwtPayload } from 'jsonwebtoken';
import { StringValue } from '../../global/types';

export const generateToken = (
  jwtPayload: Record<string, unknown>,
  secret: string,
  expiresIn: StringValue
) => {
  if (!expiresIn) {
    throw new Error('error');
  }
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
