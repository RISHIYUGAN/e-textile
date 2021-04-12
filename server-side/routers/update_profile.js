const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')

const express=require('express')

const updateprofile_router=express.Router()

updateprofile_router.post('/update_profile',async(req,res)=>{
    console.log(req)

    const token=req.headers.authorization.split(" ")[1]

            const image=req.body.image
            const name=req.body.name
            
            await Profile.update({token:token},{$set:{"image":image,"name":name}}).then(async()=>{
                await Profile.findOne({token:token}).then((pf)=>{
                    console.log(pf)
                    res.send(pf)
                })
       })
})

module.exports=updateprofile_router