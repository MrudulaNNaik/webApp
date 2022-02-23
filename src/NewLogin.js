import React from "react";
//import Profile from "./image/logo.png";
import firebase from "./firebase";

import "./newLogin.css";

class NewLogin extends React.Component {
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
          // reCAPTCHA solved, allow signInWithPhoneNumber.
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
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  render() {
    return (
      <div className="card">
        <div className="main">
          <div className="sub-main">
            <div>
              <div className="imgs">
                <div className="container-image">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/88/DXC_Logo_2021_Purple_Black.png"
                    alt="profile"
                    className="profile"
                  />
                </div>
              </div>
              <div>
                <h1 className="id">Universal ID</h1>
                <div>
                  <div>
                    <h2 className="name">Username</h2>

                    <form onSubmit={this.onSubmitName}>
                      {/*  <img src={user} alt="user" className="user"/> */}
                      <input
                        type="name"
                        name="otp"
                        placeholder="User Name"
                        required
                        onChange={this.handleChange}
                      />
                    </form>
                    <h2 className="number">Enter Phone Number</h2>
                    {/* <img src={phone} alt="phhone" className="phone"/> */}
                    <form onSubmit={this.onSignInSubmit}>
                      <div className="second-input">
                        <div id="sign-in-button"></div>
                        <input
                          type="number"
                          name="mobile"
                          placeholder="Mobile number"
                          required
                          onChange={this.handleChange}
                        />
                        <button type="submit">Submit</button>
                      </div>
                    </form>

                    <h2>Enter OTP</h2>
                    {/* <img src={otp} alt="otp" className="otp"/> */}
                    <form onSubmit={this.onSubmitOTP}>
                      <input
                        type="number"
                        name="otp"
                        placeholder="OTP Number"
                        required
                        onChange={this.handleChange}
                      />
                      <button type="Verify OTP">Verify OTP</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            )
          </div>
        </div>
      </div>
    );
  }
}

export default NewLogin;
