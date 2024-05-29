const axios = require('axios');

const TestHelper = require('./randomUser');

const newUser = TestHelper.createUser();

describe('POST /api/chat', () => {
  it('should return a chat object if chat exists or create a new chat', async () => {
    
    const userId = (await newUser).userId;
    const token = (await newUser).token;
    try {
      const res = await axios.post('http://localhost:5000/api/chat',{userId},{
        headers: {
            Authorization: `Bearer ${token}` // Token'ı istek başlığına ekle
          }
      });

      expect(res.status).toEqual(200);

    } catch (error) {
      // handle errors
    }
  });

  it('should return 400 if userId is not provided', async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat', {});

      expect(res.status).toEqual(400);
    } catch (error) {
      // handle errors
    }
  });
});
