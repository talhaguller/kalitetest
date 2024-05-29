const assert = require('assert');
const axios = require('axios');

describe('User Login API Test', function() {
  it('should authenticate user with correct credentials', async function() {
    const userData = {
      email: 'tall@example.com',
      password: '123456'
    };

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', userData);

      assert.strictEqual(response.status, 200);
      assert.ok(response.data._id, 'User ID not found in response');

    } catch (error) {
      throw error;
    }
  });

  it('should not authenticate user with incorrect credentials', async function() {
    const userData = {
      email: 'tall@example.com',
      password: 'wrongpassword'
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
  
      assert.strictEqual(response.status, 401);
      assert.strictEqual(response.data.message, 'Invalid Email or Password');
    } catch (error) {
      // HTTP yanıtı beklediğimiz gibi değilse hatayı fırlat
      if (error.response && error.response.status !== 401) {
        throw error;
      }
    }
  });
 
});

