import React, { useState, useEffect, useReducer } from "react";
import { changePersonal } from "../../../Redux/actions";
import { DashbdPersonalReducer } from "../../../Redux/Reducers";
import p1 from "../../../Assets/images/bedcover1.jpg";
// import {mapStateToProps,mapDispatchToProps} from "../../utility/mapRedux"
import { connect } from "react-redux";
import { store } from "../../../App/App";
import "./view_activity.css";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";

const ViewActivity = (props) => {
  // const [state,dispatch]= useReducer(DashbdPersonalReducer,false)
  const [check, setCheck] = useState(false);
  const [startdate, setStartDate] = useState(moment());
  const [startcalenderfoc, setStartCalenderfoc] = useState(false);
  const [enddate, setEndDate] = useState(moment());
  const [endcalenderfoc, setEndCalenderfoc] = useState(false);
  const [current, setCurrent] = useState(true);
  const [currentBookings, setCurrentBookings] = useState([
    {
        name: "SPACES Miami Printed Bed Cover",
        img: "/static/media/bedcover1.da656c91.jpg",
        date:"12/03/2001",
        delivery:"12/03/2001",
        rating:3,
        quantity:10
      },
      {
        name: "Screen",
        img: "/static/media/screen2.6ee9dfe6.jpg",
        date:"12/03/2001",
        delivery:"12/03/2001",
        rating:4,
        quantity:8
      }
  ]);
  const [previousBookings, setpreviousBookings] = useState([
    // {
    //     name: "SPACES Miami Printed Bed Cover",
    //     img: "/static/media/bedcover1.da656c91.jpg",
    //     date:"12/03/2001",
    //     delivery:"12/03/2001",
    //     rating:3,
    //     quantity:10
    //   },
    //   {
    //     name: "Screen",
    //     img: "/static/media/screen2.6ee9dfe6.jpg",
    //     date:"12/03/2001",
    //     delivery:"12/03/2001",
    //     rating:4,
    //     quantity:8
    //   }
  ]);
  useEffect(() => {
    console.log("runningv");
  }, []);
  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const onDateChange = (date) => {
    if (date) {
      // this.setState(()=>({
      //   date
      // }))
      setStartDate(date);
    }
  };

  const onFocusChange = ({ focused }) => {
    // console.log(focused)
    setStartCalenderfoc(focused);
  };
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
  return (
    <div className="his-container">
      <div className="h-title">
        <i class="fa fa-history" aria-hidden="true"></i>
        <h2>History</h2>
      </div>
      <div className="nav-div">
        <div id="slider" className="slider"></div>
        <span
          id="span-1"
          style={{ color: "white" }}
          onClick={(e) => {
            setCurrent(true);
            e.target.style.color = "white";
            document.getElementById("span-2").style.color = "black";
            document.getElementById("slider").style.left = "0px";
          }}
        >
          Current Bookings
        </span>
        <span
          id="span-2"
          onClick={(e) => {
            setCurrent(false);
            e.target.style.color = "white";
            document.getElementById("span-1").style.color = "black";
            document.getElementById("slider").style.left =
              e.target.offsetLeft - 20 + "px";
          }}
        >
          Previous Bookings
        </span>
      </div>
      <div>
        {current ? (
          <div className="products-display" style={{ marginTop: "50px" }}>

            {currentBookings.length===0?
            <div className="list-empty">
              <text style={{color:"red"}}>No</text>&nbsp;Current Bookings Found
            </div> 
            :currentBookings.map((each) => (
              <div
                style={{
                  minWidth: "50%",
                  maxWidth: "50%",
                  minHeight: "100%",
                  flex: 1,
                  marginTop: "5px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="each-product"
                  style={{
                    height: "100%",
                    flexDirection: "row",
                    width: "100%",
                    padding: "20px 10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    className="book-img-div"
                    style={{ backgroundImage: `url(${each.img})` }}
                  >
                  </div>
                  <div
                    className="book-prdct-des"
                    style={{ alignItems: "flex-start", height: "150px" }}
                  >
                    <h3 className="prd-name">{each.name}</h3>
                    <div
                      className="rating-div"
                      style={{ width: "fit-content" }}
                    >
                      <div className="marked">{markedstar(each)}</div>
                      <div className="unmarked">{unmarkedstar(each)}</div>
                    </div>
                    <div className="book-wrapper">
                      <div style={{ marginTop: "10px" }}>
                        <div style={{ textAlign: "initial" }}>
                          <h4>Quantity: {each.quantity}</h4>
                        </div>
                        <h4>Ordered Date: {each.date}</h4>
                      </div>
                      <div>
                        <h4>Expected Date: {each.delivery}</h4>
                      </div>
                    </div>
                    <div className="book-btn-div">
                        <button className="cancel">Cancel</button>
                        <button className="delivered">Delivered</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <div className="products-display" style={{ marginTop: "50px" }}>

            {previousBookings.length===0?
            <div className="list-empty">
             <text  style={{color:"red"}}>No</text>&nbsp; Previous Bookings Found
            </div> 
            :previousBookings.map((each) => (
              <div
                style={{
                  minWidth: "50%",
                  maxWidth: "50%",
                  minHeight: "100%",
                  flex: 1,
                  marginTop: "5px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="each-product"
                  style={{
                    height: "100%",
                    flexDirection: "row",
                    width: "100%",
                    padding: "20px 10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    className="book-img-div"
                    style={{ backgroundImage: `url(${each.img})` }}
                  >
                  </div>
                  <div
                    className="book-prdct-des"
                    style={{ alignItems: "flex-start", height: "150px" }}
                  >
                    <h3 className="prd-name">{each.name}</h3>
                    <div
                      className="rating-div"
                      style={{ width: "fit-content" }}
                    >
                      <div className="marked">{markedstar(each)}</div>
                      <div className="unmarked">{unmarkedstar(each)}</div>
                    </div>
                    <div className="book-wrapper">
                      <div style={{ marginTop: "10px" }}>
                        <div style={{ textAlign: "initial" }}>
                          <h4>Quantity: {each.quantity}</h4>
                        </div>
                        <h4>Ordered Date: {each.date}</h4>
                      </div>
                      <div>
                        <h4>Expected Date: {each.delivery}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default connect()(ViewActivity);
