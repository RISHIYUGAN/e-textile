const mongoose=require('mongoose')

const Shema=mongoose.Schema

const validator=require('validator')

const userschema=new Shema({

    products:{
        type:Array,
        trim:true
    },
    unique_id:{
        type:Number,
        default:0
    }
})

const mong=mongoose.model('products database',userschema)


console.log('products is running')

module.exports=mong