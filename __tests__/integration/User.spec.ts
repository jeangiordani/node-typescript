import { createConnection, getConnection, getRepository } from 'typeorm';
import supertest from 'supertest';
import app from '../../src/index';
import User from '../../src/models/User';

jest.setTimeout(30000);

const server = supertest(app);

beforeEach(() => {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '9177',
    database: 'teste_user_test',
    dropSchema: true,
    entities: ['src/models/*.ts'],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

describe('Users tests', () => {
  describe('GET /users', () => {
    it('should return all users', async () => {
      const user1: User = new User();
      user1.email = 'teste@gmail.com';
      user1.password = '12345';
      const user = await getRepository(User).save(user1);

      // console.log(user);

      const token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjM4NTU5NTQ1LCJleHAiOjE2Mzg2NDU5NDV9.ufIvZTBPbjRr_vKrXLIXPy6QobymMz3rda3jNdU33Us';

      const result = await server
        .get('/users')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      const data = result.body['data'][0];

      expect(data).toEqual({ id: user.id, email: user.email });
    });

    it('should not return all users with status 401 unauthorized', async () => {
      const user1: User = new User();
      user1.email = 'teste@gmail.com';
      user1.password = '12345';
      const user = await getRepository(User).save(user1);

      // console.log(user);

      const result = await server
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401);

      const data = result.body['message'];

      expect(data).toEqual('No token found.');
    });
  });

  describe('POST /users', () => {
    it('should be able to create a new user', async () => {
      const payload = {
        email: 'teste@gmail.com',
        password: '12345',
      };

      const result = await server
        .post('/users')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it('should not be able to create a new user with invalida fields', async () => {
      const payload = {
        email: 'teste@gmail.com',
        password: '',
      };

      const result = await server
        .post('/users')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(result.body['message']).toEqual(
        'password is not allowed to be empty'
      );
    });
  });
});
