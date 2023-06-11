const mongoose = require('mongoose')

const connect = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then((conn)=>{
        console.log(`connected to DB: ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error.message);
        process.exit(1)
    })
}

module.exports=connect;
