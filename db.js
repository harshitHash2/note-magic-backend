const mongoose = require('mongoose');

 mongoURI= 'mongodb://localhost:27017/iNotebook'

 const connectToMongo = ()=> {
    mongoose.connect(mongoURI).then(() => {
      console.log('Connected Successfully');
    })
    .catch(err => {
      console.error('Connection Error:', err);
    });

 }

 module.exports= connectToMongo;
 