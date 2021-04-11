const Product=require('../user/product')
require('../database/mongoose')


const express=require('express')


const bcrypt=require('bcrypt')

product_router=new express.Router()


const nodemailer = require('nodemailer');



product_router.post('/products',async (req,res)=>{


    const array=[
        {
            _id:1,
            name:"SPACES Miami Printed Bed Cover",
            img:"/static/media/bedcover1.da656c91.jpg",
            rating:4,
            stock:true,
            price:520
        },
        {
            _id:2,
            name:"Emerald Mandala Print Bed Cover",
            img:"/static/media/bedcover2.3feaeead.jpg",
            rating:3,
            stock:true,
            price:550
        },
        {
            _id:3,
            name:"Royal Blue Brocade Pillow Cover",
            img:"/static/media/pillowcover1.8bd30155.jpg",
            rating:2,
            stock:true,
            price:600
        },
        {
            _id:4,
            name:"Garnet Printed Pillow Cover",
            img:"data:image/jpeg;base64,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",
            rating:4,
            stock:false,
            price:300
        },
        {
            _id:5,
            name:"Design And Decor Polyester",
            img:"/static/media/sofacover1.422b4658.jpg",
            rating:2,
            stock:true,
            price:350
        },
        {
            _id:6,
            name:"Baffle Grid Sofa Slip Cover",
            img:"/static/media/sofacover2.020ec616.jpg",
            rating:3,
            stock:true,
            price:450
        },
        {
            _id:7,
            name:"Maspair Batik Window Curtain",
            img:"/static/media/screen2.6ee9dfe6.jpg",
            rating:4,
            stock:false,
            price:480
        },
        {
            _id:8,
            name:"Shawn Jacquard Door Curtain",
            img:"/static/media/screen2.6ee9dfe6.jpg",
            rating:4,
            stock:true,
            price:550
        },
        {
            _id:9,
            name:"SPACES Miami Printed Bed Cover",
            img:"/static/media/bedcover1.da656c91.jpg",
            rating:3,
            stock:true,
            price:620
        },
        {
            _id:10,
            name:"Emerald Mandala Print Bed Cover",
            img:"/static/media/bedcover2.3feaeead.jpg",
            rating:4,
            stock:false,
            price:680
        },
        {
            _id:11,
            name:"Royal Blue Brocade Pillow Cover",
            img:"/static/media/pillowcover1.8bd30155.jpg",
            rating:5,
            stock:true,
            price:600

        },
        {
            _id:12,
            name:"Garnet Printed Pillow Cover",
            img:"data:image/jpeg;base64,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",
            rating:2,
            stock:false,
            price:670
        },
        {
            _id:13,
            name:"Design And Decor Polyester",
            img:"/static/media/sofacover1.422b4658.jpg",
            rating:5,
            stock:true,
            price:430
        },
        {
            _id:14,
            name:"Baffle Grid Sofa Slip Cover",
            img:"/static/media/sofacover2.020ec616.jpg",
            rating:3,
            stock:false,
            price:555

        },
        {
            _id:15,
            name:"Maspair Batik Window Curtain",
            img:"/static/media/screen2.6ee9dfe6.jpg",
            rating:4,
            stock:false,
            price:510

        },
        {
            _id:16,
            name:"Shawn Jacquard Door Curtain",
            img:"/static/media/screen2.6ee9dfe6.jpg",
            rating:3,
            stock:true,
            price:390

        }
    ]

    await Product.insertMany({
        products:array
    }).then(()=>{
        res.send('insereted')
    })
  
})
        


        
module.exports=product_router














