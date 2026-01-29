const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'lissanSchool';

let dbInstance = null;

async function connectDB() {
    // If we are already connected, don't connect again
    if (dbInstance) return dbInstance;

    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db(dbName);
        
        // Prepare the collections object
        dbInstance = {
            users: db.collection('users'),
            courses: db.collection('courses'),
            enrollments: db.collection('enrollments')
        };
        
        return dbInstance;
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error; // This tells app.js that something went wrong
    }
}

// Export the function so app.js can see it
module.exports = connectDB;