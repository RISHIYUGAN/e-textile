const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')

const currentorders=require('../user/currentorders')


const express=require('express')


const bcrypt=require('bcrypt')


const viewcurrentorderrouter=new express.Router()


    
viewcurrentorderrouter.post("/view_current_bookings",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    // console.log("consoling",req.body)

    
            await currentorders.findOne({token:token}).then((ord)=>{
                // console.log(ord.orderedproductdetails)
                res.send(ord.orderedproductdetails)
            })
})     


module.exports=viewcurrentorderrouter
