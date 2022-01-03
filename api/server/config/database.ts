import mongoose from 'mongoose';

const URI = process.env.MONGODB_URL;

/*
mongoose.connect(`${URI}`, {
    useCreateIndex: true,
    useFind
}, (err) => {
    if(err) throw err;
    console.log('MongoDb connection');
})

*/

mongoose.connect(`${URI}`, {

}, (err) => {
    if (err) throw err;
    console.log('MongoDB connection.');
})