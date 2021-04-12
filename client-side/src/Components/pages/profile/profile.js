import React, { useEffect,useState,useRef } from "react";
import "./profile.css";
import user from "../../../Assets/images/user-logos.png";
import {compressFile} from "../../compress/compress"
import AxiosInstance from "../../axios/axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [changed,setChanged]=useState(false)
  const [processing,setProcessing]=useState(false)
  const [formData,setFormData]=useState({})
  const [imageType,setImageType]=useState("")
  const [imageError,setImageError]=useState("")
  const [popup, setPopup] = useState(false);
  const [editing,setEditing] = useState(false)
  const [loading,setLoading]=useState(false)
  const [updateimage,setUpdateImage]=useState("")
  useEffect(()=>{
  if(editing){
   document.getElementById("user-name").contentEditable="true"
   document.getElementById("user-name").focus()
  }
  else{
    document.getElementById("user-name").contentEditable="false"
    document.getElementById("user-name").blur()
  }
  },[editing])
  const inputref=useRef()
  const imageChangeHandler = (event) => {
    setImageError(" ");
    let file = event.target.files[0];
    const supportedFormats = ["jpg", "png", "jfif", "jpeg"];
    if (file) {
      const checkValidity = (name) =>
        supportedFormats.some((el) => name.toLowerCase().endsWith(el));
      if (checkValidity(file.name)) {
        setChanged(true);
        setProcessing(true);
        compressFile([file], { size: 0.3 }, (compressedFiles) => {
          // let base64 = compressedFiles[0].dataWithPrefix;
          setFormData((prev) => ({
            ...prev,
            localImage: compressedFiles[0].dataWithPrefix,
          }));
          setUpdateImage(compressedFiles[0].dataWithPrefix)
          document.getElementById("profile-pic").style.backgroundImage= `url(${compressedFiles[0].dataWithPrefix})`
        });
      } else {
        setImageError("Invalid format");
      }
    }
  };
  useEffect(()=>{
    AxiosInstance.post("view_profile")
    .then((res)=>{
      setProfile(res.data)
    })
  },[])
  const updateProfile=(name)=>{
    setEditing(false)
    let obj;
    if(name){
     obj={
      name:document.getElementById("user-name").innerHTML,
      image:profile.image
     }
    }
    else{
obj={
  name:document.getElementById("user-name").innerHTML,
  image:updateimage
     }
    }
    AxiosInstance.post("update_profile",obj)
    .then((res)=>{
      console.log(res.data)
      setProfile(res.data)
    })
  }
  return (
    <div className="pf-container">
       <div className="rep-image">
              <input  className="inputfile" ref={inputref} onChange={(e)=>imageChangeHandler(e)} type="file" type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg"/>
            </div>
      <div className="three-dots">
        <i class="fas fa-ellipsis-h" onClick={() => setPopup(!popup)}></i>
        {popup && (
          <div id="pop-up" className="pop-up">
            <div className="pop-up-wrapper">
              <div className="pin-point"></div>
              <p  className="each-pop" onClick={()=>{setEditing(true)
                setPopup(false)}}>
                <i class="fas fa-edit"></i> Edit Profile
              </p>
             
              <p className="each-pop">
                <i class="fas fa-exclamation-triangle"></i> Report
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="profile-pic-div">
        <div
          className="profile-pic"
          id="profile-pic"
          onClick={()=>{
            inputref.current.click()
          }}
          style={{ backgroundImage: `url(${profile.image})` }}
        ></div>
        <div  className="user-name" >
          <h2 id="user-name" spellCheck="false" style={{padding:"0px 10px"}}>{profile.name}
              </h2>
              {editing&&
              <div className="upd-button">
              <button onClick={()=>{
                updateProfile(false)
              }}>{
                loading?<div><i class="fas fa-sync"></i>&nbsp; <h4>Update</h4></div>:<div><i class="fas fa-sync fa-spin"></i>&nbsp; <h4>Update</h4></div>
              }
              </button>
              </div>
                 }
        </div>
      </div>
      <div className="break-line"></div>
      <div className="user-details">
        <div className="each-info">
          <h4>Customer-Id</h4>
          <h4>{profile.customer_id}</h4>
        </div>
        <div className="each-info">
          <h4>Current Bookings</h4>
          <h4>{profile.currentbookings}</h4>
        </div>
        <div className="each-info">
          <h4>Upcoming Bookings</h4>
          <h4>{profile.upcomingbookings}</h4>
        </div>
        <div className="each-info">
          <h4>Mobile</h4>
          <h4>{profile.contact}</h4>
        </div>
        <div className="each-info">
          <h4>Email</h4>
          <h4>{profile.email}</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
