const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(
    'mongodb+srv://jefersongabri:Izn1lKLZ0FhI0ys7@lojamayse.rb3z4d8.mongodb.net/',
  );
  // await mongoose.connect('mongodb://localhost:27017/lojamayse');

  console.log('Conectou ao Mongoose');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
