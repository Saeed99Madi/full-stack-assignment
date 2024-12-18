import jwt from 'jsonwebtoken';
import env from '../../config/environment';

const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

export default verifyToken;
