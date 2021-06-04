const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')
const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')

const nodemailer = require('nodemailer');


const express=require('express')


const bcrypt=require('bcrypt')


const updatecurrentordersrouter=new express.Router()

updatecurrentordersrouter.post('/update_current_booking',async (req,res)=>{
  const token=req.headers.authorization.split(" ")[1]
// const token=req.body.token


     const _id=req.body._id
     const quantity=req.body.quantity
     const booked_date=req.body.booked_date
     const expected_date=req.body.expected_date

     const message=req.body.message
 
     
        
     await Product.findOne({unique_id:0}).then(async(pr)=>{
        const products=pr.products

        var ordproduct=products.find((each)=>{
            return each._id===_id
        })
        
        ordproduct.quantity=quantity
        ordproduct.booked_date=booked_date
        ordproduct.expected_date=expected_date
        ordproduct.message=message
        


        await currentorders.findOne({token:token}).then(async(tk)=>{
            const token=tk.token
            const productdetails=tk.productdetails
            await currentorders.update({token:token},{$push:{orderedproductdetails:ordproduct}}).then(async()=>{
                await currentorders.findOne({token:token}).then(async(cur)=>{
                      const array=cur.orderedproductdetails
                      const len=array.length
                      console.log(len)
                      await Profile.findOne({token:token}).then(async(prf)=>{
                           
                         await Profile.update({token:token},{$set:{"currentbookings" :len}}).then(()=>{
                              res.send("current booking inserted ")
                             })
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
          to: user.email,
         subject: 'Test mail',
         text: 'Hey ' + user.name + '! Your booking has been recorded ! '
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


})

module.exports=updatecurrentordersrouter
