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

class Registration extends React.Component {
  state = {
    email: '',
    password: '',
    email_error: false,
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(`${base}/api/saveCustomerInitial`, userData, options)
      .then((res) => {
        if (res.data.error) {
          this.setState({ email_error: true, password: '' });
        } else if (!res.data.error) {
          this.setState({ email_error: false });
          localStorage.setItem('customer_id', res.data.data);
          this.props.setAuthentication(true);
          this.props.history.push('/');
        }
      })
      .catch((e) => this.setState({ error: true }));
  };

  /*handleSocialData = ({ name, email, id }) => {
    const userData = { name, email };
    axios.post(`${base}/api/socialLogin`, userData, options).then(res => {
      this.props.setAuthentication(true);
      localStorage.setItem("customer_id", res.data.customer_id);
      this.props.history.push("/");
    });
  };*/

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, email_error } = this.state;
    const { setAuthentication } = this.props;
    return (
      <BaseLayout>
        <Head>
          <title>Register</title>
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

        <div className="login-form">
          <div className="login-form-div">
            <form onSubmit={this.onFormSubmit}>
              <h2 className="text-center">Sign Up</h2>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-user" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={this.onChangeHandler}
                    value={email}
                    placeholder="Email"
                    required="required"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-lock" />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChangeHandler}
                    value={password}
                    placeholder="Password"
                    required="required"
                  />
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-success btn-block login-btn"
                >
                  Sign up
                </button>
              </div>

              {email_error && (
                <div className="has-error">
                  <p className="help-block text-center text-danger">
                    Email Already Exists! Use Another One.
                  </p>
                </div>
              )}

              <div className="clearfix" />

              <div className="or-seperator">
                <i>or</i>
              </div>
            </form>
            {/*Social login*/}
            <div className="text-center social-btn">
              <SocialLogin setAuthentication={setAuthentication} />
            </div>
          </div>
          <div className="hint-text">
            Already have an account?{' '}
            <AppLink
              href={`/auth/login`}
              as={`/auth/login`}
              className="text-success"
            >
              <a>Login Now!</a>
            </AppLink>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Registration;
