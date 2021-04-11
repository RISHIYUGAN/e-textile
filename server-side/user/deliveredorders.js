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

const mong=mongoose.model('deliveredorders database',userschema)



module.exports=mong