const User=require('../user/user')
require('../database/mongoose')
const Product=require('../user/product')

const express=require('express')


const bcrypt=require('bcrypt')


const fetchproductsrouter=new express.Router()

fetchproductsrouter.get('/fetch_products',async (req,res)=>{

     await Product.findOne({unique_id:0}).then(async(products)=>{
           res.send(products.products)
     })

})

module.exports=fetchproductsrouter










