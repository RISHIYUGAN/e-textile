import React, { Fragment, useState,useEffect} from "react";
import "./dashboard.css";
import axios from "axios";
import tick from "../../images/tick.png";
// import {Header} from "../../header/header";

export const Dashboard = () => {
  const [worklist, setWorklist] = useState([
    { content: "do my application", completed: false },
    { content: "test my application", completed: false },
    { content: "finish my application", completed: true },
  ]);

  useEffect(()=>{
   axios.post("http://localhost:3000/todo",
   {token:localStorage.getItem("tok")})
   .then((res)=>{
   console.log(res.data)
   setWorklist(res.data.todo)
   })
  },[])

  let i=0;
  const submitting = (e) => {
    e.preventDefault();
    console.log(e.target.test.value);
    const value = e.target.test.value;
    const update=[{content:e.target.test.value,completed:false},...worklist]
    console.log(update)
    axios
      .post("http://localhost:3000/update_todo", {
        token: localStorage.getItem("tok"),
        todolist:update,
      })
      .then((res) => {
        console.log("response:", res.data);
        setWorklist([{content:e.target.test.value,completed:false},...worklist])
        e.target.test.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const complete=(index,e)=>{
     if(e.target.innerHTML==="Mark as done"){
      const update=[...worklist]
      update[index].completed=true;
      update.splice(worklist.length,0,worklist[index])
      update.splice(index,1)
      axios
      .post("http://localhost:3000/update_todo", {
        token: localStorage.getItem("tok"),
        todolist:update,
      }).then((res)=>{
        console.log(res.data)
        setWorklist(update)
      })
   
    console.log(update)
   
     }
  }

  return (
    <div>
    <div className="Parent-Div">
      {console.log(worklist)}
      <div className="Dashboard-container">
        <div className="titleDiv">
          <h2 className="D-title">
            Today's Works
            <div style={{ display: "flex", padding: "0px 8px 0px 8px" }}>
              <div
                style={{
                  borderRadius: "10px",
                  marginRight: "3px",
                  width: "100%",
                  height: "5px",
                  backgroundColor: "red",
                }}
              ></div>
              <div
                style={{
                  borderRadius: "10px",
                  marginRight: "2px",
                  width: "50%",
                  height: "5px",
                  backgroundColor: "red",
                }}
              ></div>
              <div
                style={{
                  borderRadius: "10px",
                  marginRight: "1px",
                  width: "15%",
                  height: "5px",
                  backgroundColor: "red",
                }}
              ></div>
            </div>
          </h2>
        </div>
        <div className="AddButtonDiv">
          <div className="completed">
            {worklist.map((work) => {
              {
                work.completed === true && i++;
              }
            })}
            completed: <text style={{ color: "red" }}>{i}</text> /{" "}
            <text style={{ color: "rgb(9, 207, 9)" }}>{worklist.length}</text>
          </div>
          <button
            className="AddWorkButton"
            onClick={() => {
              var container = document.querySelector(".inputContainer");
              container.style.top = "0px";
            }}
          >
            +Add Works
          </button>
        </div>
        <div className="todo-List">
          {worklist.length!==0? worklist.map((work) => (
            <div className="eachWork">
              <div className="work-content">
                {work.completed?<del>{work.content}</del>:work.content}
                <button className="Mark-button" onClick={(e)=>{complete(worklist.indexOf(work),e)}}>
                  {work.completed?<Fragment><img className="tick" src={tick}/>Completed</Fragment>:<Fragment>Mark as done</Fragment>}
                  </button>
              </div>
              {/* <div className="break-line"></div> */}
              {worklist.indexOf(work) !== worklist.length - 1 ? (
                <div className="break-line"></div>
              ) : (
                <div className="content-end-wrapper">
                  <div className="content-end"></div>
                  <div className="content-end"></div>
                  <div className="content-end"></div>
                  <div className="content-end"></div>
                  <div className="content-end"></div>
                  <div className="content-end"></div>
                  <div className="content-end"></div>
                </div>
              )}
            </div>
          )):<div className="No-content"><text className="No">No&nbsp;</text>works to do</div>}
        </div>
        <form
          onSubmit={(e) => {
            submitting(e);
          }}
        >
          <div className="inputContainer">
            <div className="exitDiv">
              <div
                className="exit"
                onClick={() => {
                  var container = document.querySelector(".inputContainer");
                  container.style.top = "-200px";
                }}
              >
                <div className="ediv_1"></div>
                <div className="ediv_2"></div>
              </div>
            </div>
            <div className="input-wrapper">
              <div
                className="inputDiv"
                onFocus={() => {
                  var inputDiv = document.querySelector(".inputDiv");
                  inputDiv.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.513)";
                }}
                onBlur={() => {
                  var inputDiv = document.querySelector(".inputDiv");
                  inputDiv.style.boxShadow = "none";
                }}
              >
                <i class="fa fa-tasks fa-lg"></i>
                <input
                  name="test"
                  className="d-input"
                  type="text"
                  placeholder="Enter work"
                />
              </div>
              <button className="Add-Button">Add +</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};


