const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')

const currentorders=require('../user/currentorders')


const express=require('express')


const bcrypt=require('bcrypt')


const viewcurrentorderrouter=new express.Router()


    
viewcurrentorderrouter.post("/view_current_booking",async(req,res)=>{
            await currentorders.findOne({token:req.body.token}).then((ord)=>{
                res.send(ord.productdetails)
            })
})     


module.exports=viewcurrentorderrouter
