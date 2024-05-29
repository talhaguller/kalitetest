const axios = require('axios');
const TestHelper = require('./randomUser');

const newUser = TestHelper.createUser();

describe('GET /api/chat', () => {
  it('should return user chats with status 200', async () => {
    
    const token = (await newUser).token;

    try {
     
      const res = await axios.get('http://localhost:5000/api/chat', {
        headers: {
            Authorization: `Bearer ${token}` 
          }
      });

      console.assert(res.status === 200, 'Status should be 200'); // Check if status is 200
      console.assert(Array.isArray(res.data), 'Response data should be an array'); // Check if response data is an array
    } catch (error) {
      throw error; // rethrow the error to fail the test
    }
  });
});
