import React, { Component } from "react";
import Router from 'next/router'

// import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const LoginWithFacebook = ({ submittedData }) => {
  
  const componentClicked = () => {
    console.log( "Clicked!" )
  }

  const responseFacebook = response => {
    console.log(response);
    submittedData(response);

    Router.push('/')
  };

  const onFailure = response => {
    alert("Log in Failed. Try again.");
  };

  const banijjo_demo = "252755555904700";
  // const banijjo_com_bd = "1818637888366587";
  const banijjo_com_bd = "3266801990045776";

  return (
    <FacebookLogin
      appId={banijjo_com_bd}
      // autoLoad={true} // when true triggers callback and if logged in, redirects
      fields="name,email,picture"
      callback={responseFacebook}
      onFailure={onFailure}
      onClick = {componentClicked}
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
