const axios = require('axios');

class   TestHelper {
    // Rasgele isim oluşturma
    static generateRandomName() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let name = '';
      for (let i = 0; i < 6; i++) {
        name += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return name;
    }
  
    // Rasgele e-posta oluşturma
    static generateRandomEmail() {
      const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com', 'domain.com'];
      const username = TestHelper.generateRandomName().toLowerCase();
      const domain = domains[Math.floor(Math.random() * domains.length)];
      return `${username}@${domain}`;
    }
  
    // Rasgele şifre oluşturma
    static generateRandomPassword(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return password;
    }
  
    // Test verilerini oluşturma
    static generateTestData() {
      const name = TestHelper.generateRandomName();
      const email = TestHelper.generateRandomEmail();
      const password = TestHelper.generateRandomPassword(8);
      return { name, email, password };
    }

    static async createUser(){
        const testData = TestHelper.generateTestData()
        const userData = {
            name: testData.name,
            email: testData.email,
            password: testData.password,
          };
        const newUserResponse = await axios.post('http://localhost:5000/api/user/', userData);
        const userId= newUserResponse.data._id;
        const token = newUserResponse.data.token;
        return {token,userId}
    }
  }
  

  module.exports = TestHelper;


  // Kullanımı:
//   const testData = TestHelper.generateTestData();
//   console.log(testData);
