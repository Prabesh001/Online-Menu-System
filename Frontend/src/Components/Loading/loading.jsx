import React from "react";
import "./loading.css";

const LoadingComponent = ({mh}) => {
  return (
    <div className="loading-container" style={{minHeight:`${mh}vh`}}>
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
