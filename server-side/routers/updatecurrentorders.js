const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')


const express=require('express')


const bcrypt=require('bcrypt')


const updatecurrentordersrouter=new express.Router()

updatecurrentordersrouter.post('/update_current_orders',async (req,res)=>{

     const _id=req.body._id
     const booking_status=req.body.booking_status
     const name=req.body.name
     const quantity=req.body.quantity
     const date=req.body.date
     const token=req.body.token
 
     if(booking_status===true)
     {
        
     await Product.findOne({unique_id:0}).then(async(pr)=>{
        const products=pr.products

        var ordproduct=products.find((each)=>{
            return each._id===_id
        })
        
        ordproduct.quantity=quantity
        ordproduct.date=date
        


        await currentorders.findOne({token:token}).then(async(tk)=>{
            const token=tk.token
            const productdetails=tk.productdetails
            await currentorders.update({token:token},{$push:{orderedproductdetails:ordproduct}}).then(async()=>{
                await currentorders.findOne({token:token}).then(async(cur)=>{
                      const array=cur.orderedproductdetails
                      const len=array.length
                      console.log(len)
                      await Profile.findOne({token:token}).then(async(prf)=>{
                           
                         await Profile.update({token:token},{$set:{"upcomingbookings" :len}}).then(()=>{
                              res.send(" updated")
                             })
                      }) 
                })
            })
        })
        
  }) 
     }
     if(booking_status===false)
     {
         res.send('not booked')
     }

})

module.exports=updatecurrentordersrouter
