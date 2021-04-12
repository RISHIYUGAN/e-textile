import React,{useState,useEffect} from "react"
import "./dashboard.css"
import p1 from "../../../Assets/images/bedcover1.jpg"
// import {products} from "./products"
import AxiosInstance from "../../axios/axios"
import axios from "axios"
import moment from "moment"

export const Dashboard=()=>{
    const [eachdisplay,setEachdisplay]=useState(false)
    const [name,setName]=useState("")
    // const [products,setProducts]=useState([])
    const [info,setInfo]=useState({
    //  name:"SPACES Miami Printed Bed Cover",
    //   src:p1,
    //   stock:true,
    //   rating:3,
    //   price:500
    })
    const[products,setProducts]=useState([])
    useEffect(()=>{
      AxiosInstance.get("/fetch_products")
      .then((res)=>{
        console.log("fetched")
        setProducts(res.data)
      })
    },[])
    const markedstar = (prdct) => {
        var arr = [];
        for (var i = 1; i <= prdct.rating; i++) {
          // console.log("entering", i);
          arr = [...arr, <i class="fas fa-star"></i>];
          // loop()
        }
        for (var i = 0; i < 1; i++) {
          // console.log("entering1", i);
          // loop()
          return arr.map((star) => star);
        }
      };
    
      const unmarkedstar = (prdct) => {
        var arr = [];
        for (var i = 1; i <= 5 - prdct.rating; i++) {
          // console.log("entering", i);
          arr = [...arr, <i class="fas fa-star"></i>];
          // loop()
        }
        for (var i = 0; i < 1; i++) {
          // console.log("entering1", i);
          // loop()
          return arr.map((star) => star);
        }
      };
      const eachDisplay=(id)=>{
        setEachdisplay(true)
        AxiosInstance.post("/view_single_product",{_id:id})
        .then((res)=>{
          setInfo(res.data)
          document.getElementById("product").defaultValue=res.data.name
        })
      }
      const addbookings=(e)=>{
       e.preventDefault();
       AxiosInstance.post("update_current_booking",{
         _id:info._id,
         quantity:e.target.quantity.value,
         date:moment(e.target.date.value).format("DD/MM/YYYY"),
         token:localStorage.getItem("tok")
       })
       .then((res)=>{
        console.log(res.data)
       })
      console.log(moment(e.target.date.value).format("DD/MM/YYYY"),e.target.product.value,e.target.quantity.value)
      }
    return(
        <div className="db-container">
          <div className="d-title">
           <h2>Our Products</h2>
          </div>
           <div className="products-display">
           {products.map((each)=>
             <div className="each-product" onClick={()=>{
               eachDisplay(each._id)}
               }>
                 <div className="img-div">
                 <img src={each.img} className="img"/>
                 </div>
                 <div className="prdct-des">
                 <h3  className="prd-name">{each.name}</h3>
                 <div className="rating-div">
            <div className="marked">{markedstar(each)}</div>
            <div className="unmarked">{unmarkedstar(each)}</div>
          </div>
                 </div>
             </div>
           )}
           </div>
           {eachdisplay&&
           <div className="each-display">
             <div id="two-in-one" className="two-in-one">
             <div id="input-container" className="input-container">
               <div id="input-wrapper" className="input-wrapper">
               <div
            className="exitDiv"
          >
            <div className="exit"  onClick={(e)=>{
             document.getElementById("two-in-one").style.transform="translateY(-50%)"
              }}>
              <div className="ediv_1" style={{backgroundColor:"rgb(53, 53, 53)"}}></div>
              <div className="ediv_2" style={{backgroundColor:"rgb(53, 53, 53)"}}></div>
            </div>
          </div>
               <form onSubmit={(e)=>{
                 addbookings(e)
               }}>
               <h3>Place Your Booking</h3>
                 <div className="input-1">
                 <input
                 type="text"
                 placeholder="Pieces Required"
                 name="quantity"
                 />
                  <input
                 type="date"
                 placeholder="Required date"
                 name="date"
                 />
                 </div>
                 <div className="input-2">
                   <input
                   type="text"
                   placeholder="Product Name"
                   name="product"
                   id="product"
                   defaultValue={info.name}
                   />
                 </div>
                 <div className="input-3">
                   <textarea
                   placeholder="Add your Comments"
                   name="message"
                   />
                 </div>
                 <button><h3>Book Now</h3></button>
               </form>
               </div>
             </div>
             <div id="each-prdct-wrapper" className="each-prdct-wrapper">
               <div className="each-prdct">
               <div
            className="exitDiv"
          >
            <div className="exit"
            style={{
              marginRight:"0px"
            }}
             onClick={()=>
              {setEachdisplay(false)
              }}>
              <div className="ediv_1"></div>
              <div className="ediv_2"></div>
            </div>
          </div>
          <div className="book-text">
              <h3>Make a Booking</h3>
          </div>
                   <div className="des-wrapper">
                   <div className="e-prd-img-div">
                       <img src={info.img}/>
                   </div>
                   <div className="e-des">
                  
                       <h3>
                           {info.name}
                       </h3>
                       <div className="rating-div">
            <div className="marked">{markedstar(info)}</div>
            <div className="unmarked">{unmarkedstar(info)}</div>
          </div>
          <h4 className="price"><i class="fas fa-rupee-sign"></i>{info.price+".00 / piece"}</h4>
          {info.stock?<h4 className="stockin">Stock Available <i class="fas fa-check-circle"></i> </h4>:<h4 className="stockout">Out Of Stock !</h4>}
          <div className="btn-div">
          <button className="booking" onClick={()=>{
                            document.getElementById("two-in-one").style.transform="translateY(0%)"
          }}><h3>Book Now</h3></button>
          </div>
                   </div>
                   </div>
               </div>
               </div>
               </div>
            </div>
            }
        </div>
    )
}