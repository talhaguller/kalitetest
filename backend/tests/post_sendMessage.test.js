const axios = require('axios');
const TestHelper = require('./randomUser');

const newUser1 = TestHelper.createUser();
const newUser2 = TestHelper.createUser();
const newUser3 = TestHelper.createUser();


describe('PUT /api/chat/groupremove', () => {

  it('should Remove user from group', async () => {
    const userId1 = (await newUser1).userId;
    const token1 = (await newUser1).token;

    const userId2 = (await newUser2).userId;
    const token2 = (await newUser2).token;
    
    const userId3 = (await newUser3).userId;
    const token3 = (await newUser3).token;

    const createGroupData = {
        name: "deneme",
        users: `["${userId1}","${userId2}","${userId3}"]`
      };

      // Grubu oluştur
      const res = await axios.post('http://localhost:5000/api/chat/group', createGroupData, {
        headers: { Authorization: `Bearer ${token1}` }
      });
    const groupId = res.data._id; 
    try {
    const randomString = TestHelper.generateRandomName();

    data = {
      content: randomString,
      chatId: groupId,
    };
      const res2 = await axios.post('http://localhost:5000/api/message',data, {
        headers: {
            Authorization: `Bearer ${token1}` // Token'ı istek başlığına ekle
          }
      });
      console.assert(res2.status === 200, 'Status should be 200'); // Check if status is 200
    } catch (error) {
      throw error; // rethrow the error to fail the test
    }
  }).timeout(10000);
});
