const supertest = require('supertest');
const app = require('../src/app');
const { connect } = require('../src/config/db.config');
const request = supertest(app);
const db = connect();
const { message } = require('../src/constants/httpMessage');

// Common variables
const firstName = 'John';
const lastName = 'Doe';
const email = 'sample@sample.com';
const password = 'samplePassword';

describe('Authentication API', () => {
  afterEach(async () => {
    await db.user.destroy({ where: {}, truncate: true });
  });

  it('should register new user with valid data', async () => {
    // Arrange
    const userRegistration = {
      firstName,
      lastName,
      email,
      password,
    };
    // Act
    const response = await request
      .post('/api/user/register')
      .send(userRegistration);
    // Assert
    expect(response.statusCode).toEqual(201);
  });

  it('should throw error with few empty data for registration', async () => {
    // Arrange
    const user = {
      email,
      password,
    };
    // Act
    const response = await request.post('/api/user/register').send(user);
    // Assert
    expect(response.statusCode).toBe(400);
  });

  it('should throw error when login with unregistered email and password', async () => {
    // Arrange
    const userLogin = {
      email,
      password,
    };
    // Act
    const response = await request.post('/api/user/login').send(userLogin);
    // Assert
    expect(response.statusCode).toEqual(400);
  });

  it('should login user with registered email and password', async () => {
    // Arrange
    const userRegistration = {
      firstName,
      lastName,
      email,
      password,
    };
    await request.post('/api/user/register').send(userRegistration);
    const userLogin = {
      email,
      password,
    };
    // Act
    const response = await request.post('/api/user/login').send(userLogin);
    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Allergy API', () => {
  beforeEach(async () => {
    // Authenticate User
  });

  afterEach(async () => {
    await db.user.destroy({ where: {}, truncate: true });
    await db.allergy.destroy({
      where: {},
      truncate: true,
    });
  });

  async function userLogin() {
    const userRegistration = {
      firstName,
      lastName,
      email,
      password,
    };
    await request.post('/api/user/register').send(userRegistration);
    const userLogin = {
      email,
      password,
    };
    const { _body } = await request.post('/api/user/login').send(userLogin);
    const accesToken = _body.data.accessToken;
    return accesToken;
  }

  const allergyData = {
    name: 'Sample allergy',
    causes: 'Food',
    symptoms: 'Rashes',
    severity: 'HIGH',
    preventions: 'Avoid low grade food',
    treatments: 'Medication',
  };

  it('should throw error with non authenticated request when adding allergy', async () => {
    // Act
    const response = await request.post('/api/allergy').send(allergyData);
    // Assert
    expect(response.statusCode).toEqual(401);
  });

  it('should throw error with incomplete data when adding allergy', async () => {
    // Arrange
    const accessToken = await userLogin();
    const requestData = {
      name: allergyData.name,
      causes: allergyData.causes,
    };
    // Act
    const response = await request
      .post('/api/allergy')
      .send(requestData)
      .set({ Authorization: `Bearer ${accessToken}` });
    // Assert
    expect(response.statusCode).toEqual(400);
  });

  it('should add allergy with all valid data', async () => {
    // Act
    const accessToken = await userLogin();
    const res = await request
      .post('/api/allergy')
      .send(allergyData)
      .set({ Authorization: `Bearer ${accessToken}` });
    // Assert
    expect(res.statusCode).toEqual(201);
    expect(res._body.message).toEqual(message.ALLERGY_CREATED);
  });

  it('should return empty allergy list with no data in DB', async () => {
    // Arrange
    const accessToken = await userLogin();
    // Act
    const res = await request
      .get('/api/allergy')
      .set({ Authorization: `Bearer ${accessToken}` });
    // Assert
    expect(res._body.data.count).toEqual(0);
  });

  it('should return allergy data', async () => {
    // Arrange
    const accessToken = await userLogin();
    await request
      .post('/api/allergy')
      .send(allergyData)
      .set({ Authorization: `Bearer ${accessToken}` });
    // Act
    const { _body } = await request
      .get('/api/allergy')
      .set({ Authorization: `Bearer ${accessToken}` });
    // Assert
    const { data } = _body;
    expect(data.count).toEqual(1);
    expect(data.rows[0].name).toEqual(allergyData.name);
  });

  it('should update the allergy', async () => {
    // Arrange
    const accessToken = await userLogin();
    const createRes = await request
      .post('/api/allergy')
      .send(allergyData)
      .set({ Authorization: `Bearer ${accessToken}` });
    const allergyId = createRes._body.data.id;
    // Act
    const { _body } = await request
      .put(`/api/allergy/${allergyId}`)
      .send({ ...allergyData, name: 'Updated Allergy' })
      .set({ Authorization: `Bearer ${accessToken}` });
    // Assert
    expect(_body.message).toEqual(message.ALLERGY_UPDATED);
  });

  it('should delete the allergy', async () => {
    // Arrange
    const accessToken = await userLogin();
    const createRes = await request
      .post('/api/allergy')
      .send(allergyData)
      .set({ Authorization: `Bearer ${accessToken}` });
    const allergyId = createRes._body.data.id;
    // Act
    const { _body } = await request
      .delete(`/api/allergy/${allergyId}`)
      .set({ Authorization: `Bearer ${accessToken}` });
    // Assert
    expect(_body.message).toEqual(message.ALLERGY_DELETED);
  });
});
