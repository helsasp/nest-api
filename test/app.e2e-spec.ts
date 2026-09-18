import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication & Authorization E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  let foodId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: `test-${Date.now()}@example.com`,
        password: 'password123',
      })
      .expect(201);

    expect(response.body).toBeDefined();
  });

  it('should login and return JWT token', async () => {
    const email = `login-${Date.now()}@example.com`;
    const password = 'password123';

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password,
      });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password,
      })
      .expect(201);

    expect(response.body.access_token).toBeDefined();

    accessToken = response.body.access_token;
  });

  it('should access protected endpoint with valid JWT', async () => {
    await request(app.getHttpServer())
      .get('/foods')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('should reject request without JWT', async () => {
    await request(app.getHttpServer())
      .get('/foods')
      .expect(401);
  });

  it('should reject request with invalid JWT', async () => {
    await request(app.getHttpServer())
      .get('/foods')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);
  });

  it('should create a food with valid JWT', async () => {
    const response = await request(app.getHttpServer())
  .post('/foods')
  .set('Authorization', `Bearer ${accessToken}`)
  .send({
    name: 'Fried Rice',
    description: 'Delicious fried rice',
    price: 25000,
    category: 'Main Course',
  })
  .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();

    foodId = response.body.id;

    
  });

  it('should get foods with valid JWT', async () => {
    const response = await request(app.getHttpServer())
      .get('/foods')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('should update a food with valid JWT', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/foods/${foodId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Updated Fried Rice',
        price: 30000,
      })
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('should delete a food with valid JWT', async () => {
    await request(app.getHttpServer())
      .delete(`/foods/${foodId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});