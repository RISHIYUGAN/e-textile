const mongoose=require("mongoose")

const Schema=mongoose.Schema

const userschema=new Schema({
    image:{
        type:String,
        default:0,
        require:true
    },
    contact:{
        type:String,
        required:true,
        
        unique:true
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    customer_id:{
        type:Number
    },
    deliveredbookings:{
        type:Number,
        default:0
    },
    currentbookings:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
})

const mong=mongoose.model("user_profile",userschema)

module.exports=mong