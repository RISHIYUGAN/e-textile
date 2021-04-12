import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import login_image from "../../../Assets/images/login-image.jpg";
import { connect } from "react-redux";
import { AuthChange } from "../../../Redux/actions";
import AxiosInstance from "../../axios/axios";

const Login = (props) => {
  const [signup, setSignup] = useState(false);
  const [password, setPassord] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signuploading, setSignupLoading] = useState(false);
  const [loginloading, setLoginLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const LoginbuttonDisable = () => {
    if (loginDetails.email && loginDetails.password) {
      var loginButton = document.querySelector("#loginButton");
      loginButton.disabled = false;
    } else {
      var loginButton = document.querySelector("#loginButton");
      loginButton.disabled = true;
    }
  };
  const SignupbuttonDisable = () => {
    // console.log("running");
    if (signupDetails.name && signupDetails.email && signupDetails.password) {
      var submitButton = document.querySelector("#submitButton");
      submitButton.disabled = false;
    } else {
      var submitButton = document.querySelector("#submitButton");
      submitButton.disabled = true;
    }
  };

  const newUser = (e) => {
    e.preventDefault();
    document.getElementById("submitButton").disabled="true"
    setSignupLoading(true);
        if(document.querySelector("#Sign_upMessage").innerHTML="! Email already exists"){
          document.querySelector("#Sign_upMessage").innerHTML=""
     }
        document.querySelector("#Sign_upMessage").innerHTML=""
        e.preventDefault();
    AxiosInstance.post("/signup", signupDetails).then((res) => {
      document.getElementById("submitButton").disabled="false"
      console.log("response",res.data);
      setSignupLoading(false);
        setSignup(false)
        document.getElementById("email-error").innerHTML=""
    })
    .catch((error)=>{
      setSignupLoading(false);
      if(error.response.status===401){
        document.getElementById("email-error").innerHTML="Email already exists !"
        e.target.signupname.value=""
        e.target.signupemail.value=""
        e.target.signuppassword.value=""
      }
      
    })

  };
  const logging = (e) => {
    e.preventDefault();
    setLoginLoading(true)
    AxiosInstance.post("/login", loginDetails)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("tok", res.data.token);
        props.dispatch(AuthChange(localStorage.getItem("tok")));
        setLoginLoading(false)
        document.getElementById.id("error").innerHTML=""
      })
      .catch((error) => {
        setLoginLoading(false)
        if(error.response.status){
          if(error.response.status===401){
            document.getElementById("error").innerHTML=" Invalid username or password !"
            e.target.email.value=""
            e.target.password.value=""
          }
        }
      });
  };
  useEffect(() => {
    if (document.getElementById("password")) {
      if (!password) {
        document.getElementById("password").type = "password";
      } else {
        document.getElementById("password").type = "text";
      }
    }
  }, [password]);
  return (
    <div>
      <div className="login-image"></div>
      <div className="Login-Container">
        {!signup ? (
          <div>
             <p id="error" className="error">
               
            </p>
            <div className="Login-text">
              <h2>LOGIN</h2>
            </div>
           
            <div className="Login">
              <div className="user-div">
                <i
                  class="fas fa-user-circle"
                  style={{ borderRadius: "50%" }}
                ></i>
              </div>
             
              <div>
                <form
                  onSubmit={(e) => {
                    logging(e);
                  }}
                  autoComplete="on"
                >
                  <div className="division_1">
                    <div>
                      <i class="fas fa-envelope"></i>
                    </div>
                    <input
                      name="email"
                      onChange={(e) => {
                        setLoginDetails({
                          ...loginDetails,
                          email: e.target.value,
                        });
                      }}
                      type="email"
                      className="input"
                      placeholder="Email-id"
                    />
                  </div>
                  <div className="division_2">
                    <div>
                      <i class="fas fa-lock"></i>
                    </div>
                    <input
                    name="password"
                      id="password"
                      onChange={(e) => {
                        setLoginDetails({
                          ...loginDetails,
                          password: e.target.value,
                        });
                      }}
                      type="password"
                      placeholder="Password"
                      className="input"
                    />
                    {password ? (
                      <i
                        onClick={() => setPassord(false)}
                        class="fas fa-eye"
                      ></i>
                    ) : (
                      <i
                        onClick={() => {
                          setPassord(true);
                        }}
                        class="fas fa-eye-slash"
                      ></i>
                    )}
                    {/* <input onChange={(e)=>{setLoginDetails({...loginDetails,password:e.target.value})}} type="password" placeholder="*Password" className="input" /> */}
                  </div>
                  <br />
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="Submitbutton"
                      id="loginButton"
                      disabled={true}
                    >
                      <h3>
                        {loginloading ? (
                          <i class="fas fa-circle-notch fa-spin"></i>
                        ) : (
                          "Log-in"
                        )}
                      </h3>
                    </button>
                    {document.querySelector("#loginButton") &&
                      LoginbuttonDisable()}
                  </div>
                </form>
                <br />
              </div>
            </div>
            <div className="new-user">
              <h4>New user?</h4>
              <text
                href=""
                className="Register"
                onClick={() => {
                  setSignup(!signup);
                }}
              >
                <h5>Register</h5>
              </text>
            </div>
          </div>
        ) : (
          <div>
            <p className="error" id="email-error"></p>
            <h2 className="Login-text">SIGN UP</h2>
            <div className="Login">
              <h4
                className="ExitButton"
                onClick={() => {
                  setSignup(!signup);
                }}
              >
                x
              </h4>

              <div>
                <p
                  id="Sign_upMessage"
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                ></p>
                <form
                  onSubmit={(e) => {
                    newUser(e);
                  }}
                >
                  <div className="s-user-div">
                    <i class="fas fa-user-plus"></i>
                  </div>
                  <div>
                    <div className="division_3">
                      <div>
                        <i class="fas fa-user"></i>
                      </div>
                      <input
                        name="signupname"
                        onChange={(e) => {
                          setSignupDetails({
                            ...signupDetails,
                            name: e.target.value,
                          });
                        }}
                        type="text"
                        className="input"
                        placeholder="User-name"
                      />
                    </div>
                    <br />
                    <br />

                    <div className="division_4">
                      <div>
                        <i class="fas fa-envelope"></i>
                      </div>
                      <input
                        name="signupemail"
                        onChange={(e) => {
                          setSignupDetails({
                            ...signupDetails,
                            email: e.target.value,
                          });
                        }}
                        type="email"
                        className="input"
                        placeholder="Email-id"
                      />
                    </div>
                    <br />
                    <br />

                    <div className="division_5">
                      <div>
                        <i class="fas fa-lock"></i>
                      </div>
                      <input
                        onChange={(e) => {
                          setSignupDetails({
                            ...signupDetails,
                            password: e.target.value,
                          });
                        }}
                        type="password"
                        name="signuppassword"
                        placeholder="Password"
                        className="input"
                        id="password"
                      />
                      {password ? (
                        <i
                          onClick={() => setPassord(false)}
                          class="fas fa-eye"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            setPassord(true);
                          }}
                          class="fas fa-eye-slash"
                        ></i>
                      )}
                    </div>
                    <br />
                    <br />
                    {document.querySelector("#submitButton") &&
                      SignupbuttonDisable()}
                    <div style={{ textAlign: "center" }}>
                      <button
                        className="Submitbutton"
                        id="submitButton"
                        disabled={true}
                      >
                        <h3>
                          {signuploading ? (
                            <i class="fas fa-circle-notch fa-spin"></i>
                          ) : (
                            "Sign-up"
                          )}
                        </h3>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect()(Login);
