const mongoose = require('mongoose');

 mongoURI= "mongodb+srv://hash:noteas@notes.apwldxs.mongodb.net/?retryWrites=true&w=majority&appName=notes";

 const connectToMongo = ()=> {
    mongoose.connect(mongoURI).then((val) => {
      console.log('Connected Successfully');
      console.log(val.connection.host)
    })
    .catch(err => {
      console.error('Connection Error:', err);
    });

 }

 module.exports= connectToMongo;
 