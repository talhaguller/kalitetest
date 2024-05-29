const axios = require('axios');
const TestHelper = require('./randomUser');

const newUser1 = TestHelper.createUser();
const newUser2 = TestHelper.createUser();


describe('POST /api/chat/group', () => {
  it('should create a group chat with status 200', async () => {
    
    const userId1 = (await newUser1).userId;
    const token1 = (await newUser1).token;

    const userId2 = (await newUser2).userId;
    const token2 = (await newUser2).token;

    createGroupData={
      name:"Test Group3",
      users: `["${userId1}","${userId2}"]`
    }
    try {
      const res = await axios.post('http://localhost:5000/api/chat/group',createGroupData,{
        headers: {
            Authorization: `Bearer ${token1}` // Token'ı istek başlığına ekle
          }
      });

      assert.strictEqual(res.status, 200);
    } catch (error) {
      // handle errors
    }
  });

  it('should return 400 if userId is not provided', async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat/group', {});

      expect(res.status).toEqual(400);
    } catch (error) {
      // handle errors
    }
  });
});
