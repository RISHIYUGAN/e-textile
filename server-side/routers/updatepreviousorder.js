const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')


const express=require('express')


const bcrypt=require('bcrypt')


const updatepreviousordersrouter=new express.Router()

updatepreviousordersrouter.post('/update_previous_orders',async (req,res)=>{

      await currentorders.findOne({token:req.body.token}).then(async(pr)=>{
           const products=pr.orderedproductdetails
           var prd=products.find((each)=>{
                return each._id===req.body._id
           })
           

           await deliveredorders.findOne({token:req.body.token}).then(async(a)=>{

              
                await deliveredorders.update({token:req.body.token},{$push:{deliveredproductdetails:prd}}).then(async()=>{
                    await deliveredorders.findOne({token:req.body.token}).then(async(dlp)=>{
                         var array=dlp.deliveredproductdetails
                         var len=array.length
                         await Profile.findOne({token:req.body.token}).then(async(prf)=>{
                              
                              await Profile.update({token:req.body.token},{$set:{"currentbookings" :len}}).then(()=>{
                                   res.send(" updated in current")
                                  })
                          })

                    
                    })
         
               })
           })


          await currentorders.update({token:req.body.token},{$pull:{"orderedproductdetails":{"_id":req.body._id}}},{safe:true,multi:true}).then(async()=>{
                   await currentorders.findOne({token:req.body.token}).then(async(curr)=>{
                        const array=curr.orderedproductdetails
                        const len=array.length
                    await Profile.findOne({token:req.body.token}).then(async(prf)=>{
                              
                         await Profile.update({token:req.body.token},{$set:{"upcomingbookings":len}}).then(()=>{
                              // res.send(" updated in delivered")
                             })
                     })
                   })
          })

     })

})

module.exports=updatepreviousordersrouter
