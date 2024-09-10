const mongoose=require('mongoose')

const connectDB=async()=>{
    const connect=mongoose.connect(process.env.mongodb_url,{useNewUrlParser: true,
        useUnifiedTopology: true,
     })
    return connect
}

module.exports=connectDB