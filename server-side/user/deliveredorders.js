const mongoose=require('mongoose')

const Shema=mongoose.Schema

const validator=require('validator')

const userschema=new Shema({

    deliveredproductdetails:{
        type:Array
    },
    token:{
        type:String
    }
    
})

const mong=mongoose.model('deliveredbookings',userschema)



module.exports=mong