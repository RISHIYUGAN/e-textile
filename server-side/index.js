const cors=require('cors')



const express=require('express')

const app=express()

const signuprouter=require('./routers/signup')
const loginrouter=require('./routers/login')

const product_router=require('./routers/products')
const fetchproductsrouter=require('./routers/fetch_products')
const viewsinglerouter=require('./routers/viewsingleproducts')
const updatecurrentordersrouter=require('./routers/updatecurrentorders')
const viewcurrentorderrouter=require('./routers/viewcurrentorders')
const updatepreviousordersrouter=require('./routers/updatepreviousorder')
const viewpreviousordersrouter=require('./routers/viewpreviousorder')
const update_profilerouter=require('./routers/update_profile')
const view_profilerouter=require('./routers/viewprofile')

const deleterouter=require('./routers/delete')



app.use(cors())
app.use(express.json())
app.use(signuprouter)
app.use(loginrouter)
app.use(product_router)
app.use(fetchproductsrouter)
app.use(viewsinglerouter)
app.use(updatecurrentordersrouter)
app.use(viewcurrentorderrouter)
app.use(updatepreviousordersrouter)
app.use(viewpreviousordersrouter)



app.use(update_profilerouter)
app.use(view_profilerouter)


app.use(deleterouter)


app.listen(3000,()=>{
    console.log('hey , port running successfully')
})
