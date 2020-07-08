import React from 'react';
import Head from 'next/head';

import BaseLayout from '../../components/layout/base-layout';
import AppLink from '../../components/shared/AppLink';
import { fetcher } from 'utils/fetcher';
import SocialLogin from './social-login';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';
const base = process.env.FRONTEND_SERVER_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: false,
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(`${base}/api/loginCustomerInitial`, userData, options)
      .then((res) => {
        if (!res.data.error) {
          localStorage.setItem('customer_id', res.data.data);
          this.props.setAuthentication(true);
          this.props.history.push('/');
        }
      })
      .catch((e) => this.setState({ error: true }));
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const { setAuthentication } = this.props;

    return (
      <BaseLayout>
        <Head>
          <title>Login</title>
          <meta
            name="description"
            content="page detailing the products user wants to purchase"
          />
          <link rel="stylesheet" href="/css/registration-form.css" />
          <link rel="stylesheet" href="/css/social-login.css" />

          <script
            type="text/javascript"
            src="https://unpkg.com/axios/dist/axios.min.js"
          ></script>
        </Head>

        <div className="container">



          {/* desktop view  */}

          <div className="d-none d-lg-block">
            <div className="row" style={{alignItems: "center" }}>

              <div className="col-md-8">
              <img
                    className="img-fluid mt-4"
                    src="https://admin.banijjo.com.bd/upload/product/productImages/banner3.png"
                    alt="Ads"
                    title="Ads"
                  />
              </div>
              
              <div className="col-md-4">
            <div className="login-form">
              <div className="login-form-div">
                <form onSubmit={this.onFormSubmit}>
                  <h2 className="text-center">Sign in</h2>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa fa-user" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={this.onChangeHandler}
                        value={email}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa fa-lock" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.onChangeHandler}
                        value={password}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success btn-block login-btn"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="clearfix">
                    <a href="#!" className="pull-right text-success disabled">
                      Forgot Password?
                    </a>
                  </div>

                  {error && (
                    <div className="has-error">
                      <p className="help-block text-center text-danger">
                        Email or Password is not valid! Try Again.
                      </p>
                    </div>
                  )}

                  <div className="or-seperator">
                    <i>or</i>
                  </div>

                  {/*Social login*/}
                </form>

                <div className="text-center social-btn">
                  <SocialLogin setAuthentication={setAuthentication} />
                </div>
              </div>
              <div className="hint-text">
                Don't have an account?{' '}
                <AppLink
                  href={`/auth/registration`}
                  as={`/auth/registration`}
                  className="text-success"
                >
                  <a>Register Now!</a>
                </AppLink>
              </div>
            </div>
            </div>
            
            </div>
          </div>



          {/* mobile view */}

          <div className="d-lg-none">
            <div className="row" style={{justifyContent: "center" }}>
          
              <div className="col-md-8 col-sm-12">
              <div className="login-form">
                <div className="login-form-div">
                  <form onSubmit={this.onFormSubmit}>
                    <h2 className="text-center">Sign in</h2>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          onChange={this.onChangeHandler}
                          value={email}
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa fa-lock" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={this.onChangeHandler}
                          value={password}
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-success btn-block login-btn"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="clearfix">
                      <a href="#!" className="pull-right text-success disabled">
                        Forgot Password?
                      </a>
                    </div>

                    {error && (
                      <div className="has-error">
                        <p className="help-block text-center text-danger">
                          Email or Password is not valid! Try Again.
                        </p>
                      </div>
                    )}

                    <div className="or-seperator">
                      <i>or</i>
                    </div>

                    {/*Social login*/}
                  </form>

                  <div className="text-center social-btn">
                    <SocialLogin setAuthentication={setAuthentication} />
                  </div>
                </div>
                <div className="hint-text">
                  Don't have an account?{' '}
                  <AppLink
                    href={`/auth/registration`}
                    as={`/auth/registration`}
                    className="text-success"
                  >
                    <a>Register Now!</a>
                  </AppLink>
                </div>
              </div>
              </div>


              <div className="col-12">
                <img
                      className="img-fluid mt-4"
                      src="https://admin.banijjo.com.bd/upload/product/productImages/banner3.png"
                      alt="Ads"
                      title="Ads"
                    />
              </div>
            
            </div>
          </div>  


        </div>
        
      </BaseLayout>
    );
  }
}

export default Login;
