const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Textile-App',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
},()=>{
    console.log('hey , database connected succesfully')
})

module.exports=mongoose