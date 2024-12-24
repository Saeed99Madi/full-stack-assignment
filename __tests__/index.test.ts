/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest';
import app from '../server/app';
import build from '../server/database/config/build';
import { sequelize } from '../server/database';

let token = '';

beforeAll(async () => {
  await build();
});

describe('Post /api/v1/user/signup', () => {
  test('responds from /api/v1/user/signup with JSON and 200 status code', done => {
    request(app)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'Said ADMIN',
        email: 'SAdi@admin.com',
        password: '123456789',
        cover: 'https',
      })
      .end((err, res) => {
        expect(res.type).toBe('application/json');
        const response = JSON.parse(res.text);

        expect(response.status).toBe(201);
        token = response.token;
        done();

        if (err) {
          done(err);
        }
      });
  });
});

afterAll(() => {
  sequelize.close();
});
