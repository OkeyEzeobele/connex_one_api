const request = require('supertest');
const app = require('../index');

describe('GET /time', () => {
  it('should return 200 OK and a valid JSON object', async () => {
    const res = await request(app)
        .get('/time')
        .set('Authorization', 'mysecrettoken');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('epoch');
    expect(typeof res.body.epoch).toBe('number');
  });

  it('should return 403 Forbidden when Authorization header is missing', async () => {
    const res = await request(app).get('/time');
    expect(res.statusCode).toEqual(403);
  });
});
