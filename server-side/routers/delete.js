const User=require('../user/user')
require('../database/mongoose')

const Product=require('../user/product')

const express=require('express')

const currentorders=require('../user/currentorders')


const bcrypt=require('bcrypt')


const nodemailer = require('nodemailer');

const deleterouter=new express.Router()

deleterouter.post('/delete',async(req,res)=>{

    await User.findOne({_id:req.body.token}).then(async(name)=>{
      const nam=name.name
      const email=name.email

    //   let mailTransporter = nodemailer.createTransport({
    //     service: 'gmail',
    //    auth: {
    //    user: 'parthivijay151@gmail.com',
    //    pass: '6382811325'
    // }
    // });
    
    // let mailDetails = {
    //   from: 'parthivijay151@gmail.com',
    //   to: email,
    //  subject: 'Test mail',
    //  text: 'oops ' + nam + ' We badly miss you ! '
    // };
    
    // mailTransporter.sendMail(mailDetails, function(err, data) {
    // if(err) 
    // {
    // console.log(err);
    // } else 
    // {
    // console.log('Email sent successfully');
    // }
    // });

      await User.deleteMany({_id:req.body.token}).then(async(name)=>{

        await currentorders.deleteMany({token:req.body.token}).then(()=>{
            res.send("deleted user info and his orders ")
        })
     })
     

    })
    

})

module.exports=deleterouter

