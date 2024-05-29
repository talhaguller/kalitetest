const axios = require('axios');
const assert = require('assert');

describe('User Search API', function() {
  it('should return users matching search criteria', async function() {
    // Kullanıcı girişi yap
    const loginResponse = await axios.post('http://localhost:5000/api/user/login', {
      email: 'tall@example.com',
      password: '123456'
    });
    const token = loginResponse.data.token; // Giriş sonucunda alınan token

    // Kullanıcı arama isteği
    try {
      const searchResponse = await axios.get('http://localhost:5000/api/user?search=t', {
        headers: {
          Authorization: `Bearer ${token}` // Token'ı istek başlığına ekle
        }
      });

      assert.strictEqual(searchResponse.status, 200);
      assert.ok(Array.isArray(searchResponse.data), 'Response should be an array');
      // Diğer doğrulamaları buraya ekleyebilirsiniz, örneğin dönen kullanıcılarla ilgili kontroller
    } catch (error) {
      throw new Error('Failed to search users');
    }
  });
});
