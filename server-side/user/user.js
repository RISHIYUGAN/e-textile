const mongoose=require('mongoose')

const Shema=mongoose.Schema

const validator=require('validator')

const userschema=new Shema({


    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Not a valid mail')
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(value.includes("PASSWORD")){
                throw new Error("Sorry please try another password")
            }
        }
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    token:{
        type:String
    }
})

const mong=mongoose.model('login',userschema)


console.log('user information is running')

module.exports=mong