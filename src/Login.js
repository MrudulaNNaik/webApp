import React, { Fragment } from "react";
import firebase from "./firebase";

class Login extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      })
      .catch((error) => {
        console.log("SMS not sent");
      });
  };
  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
      })
      .catch((error) => {
        console.log("User not verified");
      });
  };
  render() {
    return (
      <div>
        <div className="login-page-backgroud">
          <div className="login-card">
            <img
              className="logo"
              src="https://www.datocms-assets.com/2885/1623978564-dxc-logo-horizpurple-black-rgb.png"
              alt="..."
            />
            <form onSubmit={this.onSignInSubmit}>
              <div id="sign-in-button"></div>
              <label className="label">Name</label>
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Enter Name"
                required
                onChange={this.handleChange}
              />
            </form>
            <form onSubmit={this.onSignInSubmit}>
              <div id="sign-in-button"></div>
              <label className="label">Mobile Number</label>
              <input
                className="input"
                type="number"
                name="mobile"
                placeholder="Enter Mobile number"
                required
                onChange={this.handleChange}
              />
            </form>
            <button
              type="submit"
              className="submit-button"
              onClick={this.onSignInSubmit}
            >
              Get OTP
            </button>
            <label className="label">Enter OTP</label>
            <form onSubmit={this.onSubmitOTP}>
              <input
                className="input"
                type="number"
                name="otp"
                placeholder="OTP Number"
                required
                onChange={this.handleChange}
              />
            </form>
            <button
              className="submit-button"
              type="submit"
              onClick={this.onSubmitOTP}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
