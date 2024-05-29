const axios = require('axios');
const assert = require('assert');


const TestHelper = require('./randomUser');
const testData = TestHelper.generateTestData();

describe('User Registration API', function() {
  it('should register a new user', async function() {
  
    const userData = {
    name: testData.name,
    email: testData.email,
    password: testData.password,
  };
    try {
      const response = await axios.post('http://localhost:5000/api/user/', userData);
      assert.strictEqual(response.status, 201);
      assert.ok(response.data._id, 'User ID not found in response');
      assert.strictEqual(response.data.name, userData.name);
      assert.strictEqual(response.data.email, userData.email);
      assert.strictEqual(response.data.isAdmin, false);
      assert.ok(response.data.token, 'Token not found in response');
    } catch (error) {
      throw new Error('Failed to register a new user');
    }
  });

  it("should return an error if required fields are missing", async function () {
    const userData = {
      email: testData.email,
      password: testData.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/",
        userData
      );
      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.data.message, "Please Enter all the Feilds");
    } catch (error) {
      if (error.response && error.response.status !== 400) {
        throw error;
      }
    }
  });

  it('should return an error if user already exists', async function() {
    // Var olan bir kullanıcı oluşturun
  const userData = {
    name:"ahmetcs",
    email:"ahmeeetdt@example.com",
    password:"123456"
};

    // Aynı kullanıcı bilgileriyle kayıt denemesi yapın
    try {
      const response = await axios.post('http://localhost:5000/api/user/', userData);
      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.data.message, 'User already exists');
    } catch (error) {
      if (error.response && error.response.status !== 400) {
        throw error;
      }
    }
  });
});


