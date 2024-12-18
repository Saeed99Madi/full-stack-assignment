import { sign } from 'jsonwebtoken';
import environment from '../../config/environment';

const generateToken = (payload: object): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    sign(payload, environment.SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
};

export { generateToken };
