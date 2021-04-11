const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const profile=require('../user/profile')

const express=require('express')

const updateprofile_router=express.Router()

updateprofile_router.post('/update_profile',async(req,res)=>{

    res.send('update profile running')
    //         const token=req.body.token
    //         const image=req.body.image
            
    //         await user_profile.update({token:token},{$set:{"image":image}}).then(()=>{
    //           res.send("userprofile works been updated")
    //    })
})

module.exports=updateprofile_router