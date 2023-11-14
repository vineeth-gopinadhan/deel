const request = require('supertest');
const app = require('../../src/app');

describe('GET /contracts/:id', () => {
  test('returns 404 on no contract', async () => {
    const response = await request(app)
        .get('/contracts/1')
        .set('profile_id', 2);
    expect(response.status).toBe(404);
  });

  test('returns 401 on invalid profile', async () => {
    const response = await request(app)
        .get('/contracts/1')
        .set('profile_id', 0);
    expect(response.status).toBe(401);
  });

  test('returns the correct contract', async () => {
    const response = await request(app)
        .get('/contracts/1')
        .set('profile_id', 5);
    expect(response.status).toBe(200);
    expect(response.body.result.contract.id).toBe(1);
  });
});
