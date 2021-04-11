const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')

const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')


const express=require('express')


const bcrypt=require('bcrypt')


const viewpreviousorderrouter=new express.Router()


    
viewpreviousorderrouter.post("/view_previous_orders",async(req,res)=>{
            res.send('view prev order')
})     


module.exports=viewpreviousorderrouter
