import mongoose from "mongoose";
const dbURI = 'mongodb+srv://artib:1234@webdb.89olebj.mongodb.net/'

mongoose.connect(dbURI, {
    useNewUrlParser: true, useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to mongoDB`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Close Mongoose connection when the Node process terminates
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});

export const dbmong = mongoose.connection;
