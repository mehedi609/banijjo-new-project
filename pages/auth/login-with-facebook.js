import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const LoginWithFacebook = ({ submittedData }) => {
  
  const responseFacebook = response => {
    console.log({ success: response });
    submittedData(response);
  };

  const onFailure = response => {
    alert("Log in Failed. Try again.");
  };

  const banijjo_demo = "252755555904700";
  const banijjo_com_bd = "1818637888366587";

  return (
    <FacebookLogin
      appId={banijjo_com_bd}
      fields="name,email,picture"
      callback={responseFacebook}
      onFailure={onFailure}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          className="loginBtn loginBtn--facebook"
        >
          Sign in with <b>Facebook</b>
        </button>
      )}
    />
  );
};

export default LoginWithFacebook;
