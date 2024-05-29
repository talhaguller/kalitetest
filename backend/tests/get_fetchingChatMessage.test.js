const axios = require('axios');
const TestHelper = require('./randomUser');
const TestGroup = require('./randomChatGroup');

const group = TestGroup.createGroup();

describe('GET /api/message', () => {
  it('should return user chats with status 200', async () => {
    
    const token = (await group).token1;
    const groupId = (await group).groupId;

    try {
     const url = "http://localhost:5000/api/message/"+groupId;
     console.log(url);
      const res = await axios.get( url, {
        headers: {
            Authorization: `Bearer ${token}` 
          }
      });

      console.assert(res.status === 200, 'Status should be 200'); 
    } catch (error) {
      throw error; 
    }
  });
});
