const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')

const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')


const express=require('express')


const bcrypt=require('bcrypt')


const viewpreviousorderrouter=new express.Router()


    
viewpreviousorderrouter.post("/view_previous_bookings",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]

    await deliveredorders.findOne({token:token}).then((dlp)=>{
       res.send(dlp.deliveredproductdetails)
    })

})     


module.exports=viewpreviousorderrouter
