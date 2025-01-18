import React from "react";

const ErrorPage = ({setSelectedIndex}) => {
  setSelectedIndex(null)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ alignContent:"center", padding:"20px"}}>
      <div className="text-center p-8 bg-white shadow-md rounded-lg" style={{borderRadius:"10px", padding:"5% 10%"}}>
        <h1 className="text-4xl font-extrabold text-red-600">Oops!</h1>
        <p className="mt-4 text-xl text-gray-700">Something went wrong...</p>
        <p className="mt-2 text-lg text-gray-500">
          We are sorry, but we couldn't process your request. Please check your internet connection or your url.
        </p>
        <div className="mt-6">
          <a
            href="/Home">
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
