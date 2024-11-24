const mongoose = require('mongoose');
require('dotenv').config()


//MongoDb Connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(()=> console.log("DB Connected Succesfully"))
.catch((err)=> console.log(err))