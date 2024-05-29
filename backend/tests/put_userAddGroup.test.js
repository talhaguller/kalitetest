const axios = require('axios');
const assert = require('assert');
const TestGroup = require('./randomChatGroup');
const TestHelper = require('./randomUser');

const group = TestGroup.createGroup();
const newUser = TestHelper.createUser();

describe('PUT /api/chat/groupadd', function() {
  it('Gruba yeni kullanıcı ekleme', async function() {

    const groupId = (await group).groupId;
    const token = (await group).token1;
    const userId = (await newUser).userId;

    const data = {
      chatId:groupId,
      userId:userId
  }
    try {
      const response = await axios.put('http://localhost:5000/api/chat/groupadd', data, {
        headers: {
          Authorization: `Bearer ${token} `},
      });

      console.assert(response.status === 200, 'Status should be 200'); // Check if status is 200


    } catch (error) {
      throw error;
    }
  }).timeout(5000);
  it('Hatalı chatId veya userId için hata vermeli', async function() {
    const userId = (await newUser).userId;
    const token = (await group).token1;

    const data = {
        chatId : '6605ad3ef7cd0c6f600f3313',
        userId : userId
    }

    // Gruba kullanıcı ekleme isteği
    try {
      const response = await axios.put('http://localhost:5000/api/chat/groupadd', data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      // Hata beklendiğinden buraya gelmemeli
      assert.strictEqual(response.status, 404);
      assert.fail('Hata bekleniyordu');
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        throw error;
      }
    }
  }).timeout(5000);

});
