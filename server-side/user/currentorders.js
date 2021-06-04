const mongoose=require('mongoose')

const Shema=mongoose.Schema

const validator=require('validator')

const userschema=new Shema({

    orderedproductdetails:{
        type:Array
    },
    token:{
        type:String
    }
    
})

const mong=mongoose.model('currentbookings',userschema)



module.exports=mong