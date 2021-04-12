import React, { useState, useEffect } from "react";
import "./Header.css";
import pencil from "../../Assets/images/pencil.png";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux"
import { AuthChange,Authfalse,changePersonal,changehistryPersonal } from "../../Redux/actions"
import {history} from "../../router/Router"

const Header = (props) => {
  const [dashboardCnt, setDashboardCnt] = useState(false);
  const [ActivityCnt, setActivityCnt] = useState(false);
  const [i, setI] = useState(0);
  useEffect(() => {
    console.log("running");
    var active = document.getElementsByClassName("navActive")[0].parentElement.parentElement;
    // active.style.background = "linear-gradient(90deg,rgba(4, 216, 253, 0.466),rgb(68, 68, 248))";
    active.style.backgroundColor="rgb(100, 128, 255)"
  }, []);
  const personal = () => {
    if(!props.personal){
      props.changePersonal()
    }
  };
  const profession=()=>{
    if(props.personal){
      props.changePersonal()
    }
  }

  const personalhistory=()=>{
    props.changehisPersonal()
  }
  const professionhistory=()=>{
    props.changehisPersonal()
  }
  const logout=()=>{
    localStorage.removeItem("tok")
   props.AuthChange("");
  }
  return (
    <div className="Sidebar">
      {console.log("act",ActivityCnt)}
      <div className="Title">
        <h2>E-Tex</h2>
      </div>
      <div className="NavContainer">
        <div className="eachNav">
          <div className="iconDiv">
            <div className="sideIcon">
              <i class="fas fa-tasks"></i>
            </div>
            <text id="Dashboard" className="sidebarText">
              <NavLink
                to="dashboard"
                className="navClass"
                activeClassName="navActive"
              >
                <h5>
                Our Products
                </h5>
              </NavLink>
            </text>
          </div>
        </div>
        <div className="eachNav">
          <div className="iconDiv">
            <div className="sideIcon">
              <i class="fa fa-history" aria-hidden="true"></i>
            </div>
            <text id="View_Activity" className="sidebarText">
              <NavLink
                to="/view_activity"
                className="navClass"
                activeClassName="navActive"
              >
                <h5>
                View Bookings
                </h5>
              </NavLink>
            </text>
            <div></div>
          </div>
        </div>
        <div className="eachNav">
          <div className="iconDiv">
            <div className="sideIcon">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <text className="sidebarText"> <NavLink
                to="Profile"
                className="navClass"
                activeClassName="navActive"
              >
                <h5>Profile</h5>
                </NavLink></text>
          </div>
        </div>
        <div className="eachNav">
          <div className="iconDiv">
            <div className="sideIcon">
              <i class="fa fa-power-off" aria-hidden="true"></i>
            </div>
            <text className="sidebarText" onClick={()=>{
            logout()
            }}><h5>Logout</h5></text>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
 const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth,
  personal: state.Dasbd,
  hispersonal:state.History
});

 const mapDispatchToProps=(dispatch)=>({
  AuthChange:(token)=>dispatch(AuthChange(token)),
  Authfalse:()=>dispatch(Authfalse()),
  changePersonal:()=>dispatch(changePersonal()),
  changehisPersonal:()=>dispatch(changehistryPersonal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
