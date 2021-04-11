const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')

const express=require('express')

const viewprofile_router=express.Router()

viewprofile_router.post('/view_profile',async(req,res)=>{

    await Profile.findOne({token:req.body.token}).then((profile)=>{
        res.send(profile)
    })
    
})

module.exports=viewprofile_router