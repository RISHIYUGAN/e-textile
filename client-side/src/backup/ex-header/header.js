import React from "react"
import "./header.css"
import logo from "../../images/todo_logo.png"
import pencil from "../../images/pencil.png"
import Logout from "../../images/logout.png"
import {connect} from "react-redux"
import {Authfalse} from "../../Redux/actions"

const Header=(props)=>{
  const loggingOut=()=>{
    localStorage.removeItem("tok")
    props.dispatch(Authfalse())
  }
    return(
        <div className="header-container">
          <img src={logo} className="todo-logo"/>
          <span><h1 className="header-title"><span className="To">To</span><span className="Do">Do</span></h1></span>
          <img src={pencil} className="pencil"/>
          <div style={{width:"100%",display:"flex",justifyContent:"flex-end",paddingRight:"20px"}}>
          <img style={{cursor:"pointer",width:"50px",height:"50px"}} onClick={()=>[
             loggingOut()
          ]} src={Logout}/>
          </div>
        </div>
    )
}


export default connect()(Header)