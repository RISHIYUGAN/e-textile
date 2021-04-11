const User=require('../user/user')
require('../database/mongoose')


const express=require('express')


const bcrypt=require('bcrypt')


const nodemailer = require('nodemailer');

const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')
const Profile=require('../user/profile')



const signuprouter=new express.Router()

signuprouter.post('/signup',async (req,res)=>{

   
    const username=req.body.name
    const preuserpass=req.body.password
    const preuseremail=req.body.email
    const ph_number=req.body.contact_number
    const image=req.body.image
    
    
    const hash=bcrypt.hashSync(preuserpass,9)
    
    const userhash=new User({
        name:username,
        email:preuseremail,
        password:hash,
        contact_number:ph_number
    })

    const profile=new Profile({
         image:image,
         contact_number:ph_number,
         name:username,
         email:preuseremail
    })

    var count=await User.countDocuments({})
    
    const currorders=new currentorders(req.body)
    const deliverorders=new deliveredorders(req.body)
    

    await User.findOne({email:req.body.email}).then((user)=>{
        if(user)
        {
              res.send("Email already exists")
        }
        else
        {
            count+=1101;
            profile.personal_id=count

            userhash.save().then((user)=>{
                const token=user._id
               
                currorders.save().then(async (curr)=>{
                    const currid=curr._id
                    await currentorders.findOne({_id:currid}).then(async ()=>{
                            await currentorders.findByIdAndUpdate(currid,{token:token}).then(async()=>{
                                    deliverorders.save().then(async(deliv)=>{
                                            const delivid=deliv._id
                                            await deliveredorders.findOne({_id:delivid}).then(async()=>{
                                                 await deliveredorders.findByIdAndUpdate(delivid,{token:token}).then(async()=>{
                                                     await profile.save().then(async(prof)=>{
                                                           const profid=prof._id
                                                           await Profile.findByIdAndUpdate(profid,{token:token}).then(()=>{
                                                               res.send('sign in updated')
                                                           })
                                                     })
                                                 })
                                            })
                                    })
                                })
                            })
                    })
                })
                
            

  
      //   let mailTransporter = nodemailer.createTransport({
      //          service: 'gmail',
      //         auth: {
      //         user: 'parthivijay151@gmail.com',
      //         pass: '6382811325'
      //      }
      //   });
  
      //    let mailDetails = {
      //        from: 'parthivijay151@gmail.com',
      //        to: req.body.email,
      //       subject: 'Test mail',
      //       text: 'Hey ' + req.body.name + ' Nice to have you in TODO interface'
      //     };
  
      //    mailTransporter.sendMail(mailDetails, function(err, data) {
      //    if(err) 
      //    {
      //     console.log(err);
      //    } else 
      //    {
      //      console.log('Email sent successfully');
      //    }
      // });


           
        }




    })  
})


module.exports=signuprouter










