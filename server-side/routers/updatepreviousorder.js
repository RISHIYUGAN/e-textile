const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')

const nodemailer = require('nodemailer');


const express=require('express')


const bcrypt=require('bcrypt')


const updatepreviousordersrouter=new express.Router()

updatepreviousordersrouter.post('/update_previous_booking',async (req,res)=>{
     const token=req.headers.authorization.split(" ")[1]
     console.log(req.body)
     const booking_status=req.body.booking_status

     if(booking_status===true)
     {
          console.log('true running')
          await currentorders.findOne({token:token}).then(async(pr)=>{
               const products=pr.orderedproductdetails
               var prd=products.find((each)=>{
                    return each._id===req.body.id
               })
               
    
               await deliveredorders.findOne({token:token}).then(async(a)=>{
    
                  
                    await deliveredorders.update({token:token},{$push:{deliveredproductdetails:prd}}).then(async()=>{
                        await deliveredorders.findOne({token:token}).then(async(dlp)=>{
                             var array=dlp.deliveredproductdetails
                             var len=array.length
                             console.log(len)
                             await Profile.findOne({token:token}).then(async(prf)=>{
                                  
                                  await Profile.update({token:token},{$set:{"deliveredbookings" :len}}).then(()=>{
                                   //     res.send(" updated in current")
                                      })
                              })
    
                        
                        })
             
                   })
               })
    
    
              await currentorders.update({token:token},{$pull:{"orderedproductdetails":{"_id":req.body.id}}},{safe:true,multi:true}).then(async()=>{
                       await currentorders.findOne({token:token}).then(async(curr)=>{
                            const array=curr.orderedproductdetails
                            const len=array.length
                            console.log(len)

                            
                            res.send(curr.orderedproductdetails)
                        await Profile.findOne({token:req.body.token}).then(async(prf)=>{
                                  
                             await Profile.update({token:token},{$set:{"currentbookings":len}}).then(()=>{
                              //     res.send(" updated in delivered")
                                 })
                         })
                       })
              })
    
         })

         await User.findOne({_id:token}).then((user)=>{
          const email=user.email
         let mailTransporter = nodemailer.createTransport({
             service: 'gmail',
            auth: {
            user: 'parthivijay151@gmail.com',
            pass: '6382811325'
         }
      });
 
       let mailDetails = {
           from: 'parthivijay151@gmail.com',
           to: email,
          subject: 'Test mail',
          text: 'Hey ' + user.name + '! Your booking is been delivered successfully ! '
        };
 
       mailTransporter.sendMail(mailDetails, function(err, data) {
       if(err) 
       {
        console.log(err);
       } else 
       {
         console.log('Email sent successfully');
       }
    });
 
 
        })
 }

      if(booking_status===false)
      {
          
          
          console.log('false running')
          await currentorders.findOne({token:token}).then(async(pr)=>{
               const products=pr.orderedproductdetails
               var prd=products.find((each)=>{
                    return each._id===req.body.id
               })             
    
               
              await currentorders.update({token:token},{$pull:{"orderedproductdetails":{"_id":req.body.id}}},{safe:true,multi:true}).then(async()=>{
                       await currentorders.findOne({token:token}).then(async(curr)=>{
                            const array=curr.orderedproductdetails
                            const len=array.length
                            console.log(len)
                            res.send(curr.orderedproductdetails)
                        await Profile.findOne({token:token}).then(async(prf)=>{
                                  
                             await Profile.update({token:token},{$set:{"currentbookings":len}}).then(()=>{
                                  // res.send(" updated in delivered")
                                 })
                         })
                       })
              })
    
         })

         await User.findOne({_id:token}).then((user)=>{
          const email=user.email
         let mailTransporter = nodemailer.createTransport({
             service: 'gmail',
            auth: {
            user: 'parthivijay151@gmail.com',
            pass: '6382811325'
         }
      });
 
       let mailDetails = {
           from: 'parthivijay151@gmail.com',
           to: email,
          subject: 'Test mail',
          text: 'Hey ' + user.name + '! Your booking has been cancelled successfully ! '
        };
 
       mailTransporter.sendMail(mailDetails, function(err, data) {
       if(err) 
       {
        console.log(err);
       } else 
       {
         console.log('Email sent successfully');
       }
    });
 
 
        })         
  
  }


})

module.exports=updatepreviousordersrouter
