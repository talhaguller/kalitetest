const axios = require('axios');
const TestGroup = require('./randomChatGroup');

const newGroup = TestGroup.createGroup();
//http://localhost:5000/api/chat/rename

describe('PUT /api/chat/rename', () => {

  it('should rename a group chat', async () => {

    const token = (await newGroup).token1;
    const groupId = (await newGroup).groupId;
    const groupData = {
      chatId: groupId,
      chatName: "Test Group Update3",
    };
    try {
     
    
      const res = await axios.put('http://localhost:5000/api/chat/rename',groupData, {
        headers: {
            Authorization: `Bearer ${token}` // Token'ı istek başlığına ekle
          }
      });
      console.assert(res.status === 200, 'Status should be 200'); // Check if status is 200
    } catch (error) {
      throw error; // rethrow the error to fail the test
    }
  }).timeout(10000);
});
