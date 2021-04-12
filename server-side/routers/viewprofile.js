const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')

const express=require('express')

const viewprofile_router=express.Router()

viewprofile_router.post('/view_profile',async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]


    await Profile.findOne({token:token}).then((pf)=>{
        res.send(pf)
    })
    
})

module.exports=viewprofile_router