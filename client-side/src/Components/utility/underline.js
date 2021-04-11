import React from "react"

export const UnderLine=(props)=>{
    return (
        <div style={{ display: "flex", padding: "0px 8px 0px 8px" }}>
        <div
          style={{
            borderRadius: "50px",
            outline:"none",
            border:"none",
            marginRight: "3px",
            width: "100%",
            height: "3px",
            backgroundColor: props.backgroundColor,
          }}
        ></div>
        <div
          style={{
            borderRadius: "50px",
            outline:"none",
            border:"none",
            marginRight: "2px",
            width: "50%",
            height: "3px",
            backgroundColor: props.backgroundColor,
          }}
        ></div>
        <div
          style={{
            borderRadius: "50px",
            outline:"none",
            border:"none",
            marginRight: "1px",
            width: "15%",
            height: "3px",
            backgroundColor: props.backgroundColor,
          }}
        ></div>
      </div>
    )
}