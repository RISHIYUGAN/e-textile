const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')

const currentorders=require('../user/currentorders')
const deliveredorders=require('../user/deliveredorders')


const express=require('express')


const bcrypt=require('bcrypt')


const viewsinglerouter=new express.Router()


    
viewsinglerouter.post("/view_single_product",async(req,res)=>{
      await Product.findOne({unique_id:0}).then((pr)=>{
          const indproducts=pr.products
          
          var specificitem=indproducts.find((each)=>{
                   return each._id===req.body._id
          })
          res.send(specificitem)
      })
      
})     


module.exports=viewsinglerouter




// await Product.findOne({unique_id:0}).then((pr)=>{
//       var prdcts=pr.products
//             var finding= prdcts.find((each)=>{
//                 return each._id===12
//              })
//       console.log("finding",finding);
//      })




