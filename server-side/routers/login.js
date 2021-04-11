const User=require('../user/user')
require('../database/mongoose')


const express=require('express')


const bcrypt=require('bcrypt')

const loginrouter=new express.Router()


const nodemailer = require('nodemailer');



loginrouter.post('/login',async (req,res)=>{
        const postuserpass=req.body.password
        // console.log(postuserpass)
        // console.log(req.body.email)

        //  console.log("enter")
        await User.findOne({email:req.body.email}).then((usermail)=>{
        if(usermail)
    
        {
            

            // console.log("same mail")
           const compare=bcrypt.compareSync(postuserpass,usermail.password)

           if(compare)
            {
                // console.log("same mail and same password")

                res.send({token:usermail._id,email:usermail.email,name:usermail.name})
            }
            else
            {
                // console.log("wrong pass")
                res.status(401).send("")
            }
        }
        else
        {
            // console.log("no such mail")
            res.status(401).send("")

        }
    }) 
})
        
module.exports=loginrouter














