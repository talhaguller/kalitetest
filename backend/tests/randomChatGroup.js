const axios = require('axios');
const TestHelper = require('./randomUser');

class TestGroup {
  static async createUserAndToken() {
    const newUser = await TestHelper.createUser();
    return { userId: newUser.userId, token: newUser.token };
  }

  static async createGroup() {
    try {
      // İki kullanıcı ve token oluştur
      const { userId: userId1, token: token1 } = await this.createUserAndToken();
      const { userId: userId2, token: token2 } = await this.createUserAndToken();

      // Grup adını oluştur
      const groupName = TestHelper.generateRandomName();

      // Grup verilerini hazırla
      const createGroupData = {
        name: groupName,
        users: `["${userId1}","${userId2}"]`
      };

      // Grubu oluştur
      const res = await axios.post('http://localhost:5000/api/chat/group', createGroupData, {
        headers: { Authorization: `Bearer ${token1}` }
      });

      // Dönen yanıttan grup ID'sini al
      const groupId = res.data._id;

      return { token1, groupId };
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  }
}

module.exports = TestGroup;
