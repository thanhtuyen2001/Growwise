// connect to mongodb
const mongoose = require('mongoose');


async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect db Successfully !!!');
  } catch (error) {
    console.log('Connect db failed. Exit now...!');
  }
}

module.exports = { connect };
