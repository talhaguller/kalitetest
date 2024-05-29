const axios = require('axios');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const assert = require('assert'); // Eksik assert modülü eklendi

const YOUR_MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://talha:talhaegitim@cluster0.g30k2rl.mongodb.net/';
const dbName = 'test';
const collectionName = 'users';

describe('User Login API Test', function() {
    let client;
    let db;

    before(async () => {
        try {
            client = new mongodb.MongoClient(YOUR_MONGODB_URI, { useUnifiedTopology: true });
            await client.connect();
            db = client.db(dbName);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1); // Hata durumunda testi sonlandır
        }
    });

    after(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await db.collection(collectionName).deleteMany({});
    });
    it('should authenticate user with correct credentials', async function() {
        const userData = {
            email: 'tall@example.com',
            password: '123456'
        };

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await db.collection(collectionName).insertOne({
            email: userData.email,
            password: hashedPassword
        });

        const response = await axios.post('http://localhost:5000/api/user/login', userData);

        assert.strictEqual(response.status, 200);
        assert.ok(response.data._id, 'User ID not found in response');
    }).timeout(10000);

    it('should not authenticate user with incorrect credentials', async function() {
        const userData = {
            email: 'tall@example.com',
            password: 'wrongpassword'
        };

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', userData);

            assert.strictEqual(response.status, 401);
            assert.strictEqual(response.data.message, 'Invalid Email or Password');

        } catch (error) {
            // HTTP response not as expected, throw error
            if (error.response && error.response.status !== 401) {
                throw error;
            }
        }
    });
});
