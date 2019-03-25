import React, { Component } from "react";
import "./Login.css";
import { withRouter, Redirect } from "react-router-dom";
import Logo from "./hyperbola-logo.svg";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      user: null
    };
  }

  // Configure FirebaseUI.
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      this.props.db.auth.GoogleAuthProvider.PROVIDER_ID,
      this.props.db.auth.FacebookAuthProvider.PROVIDER_ID,
      this.props.db.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log("signInSuccessWithAuthResult", authResult, redirectUrl);
        this.props.history.push("/user");
        return false;
      }
    }
  };

  componentDidMount() {}

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <img
            src={Logo}
            className="logo"
            alt=""
            width="150px"
            height="150px"
          />
          <div className="text-large">Select login method:</div>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={this.props.db.auth()}
          />
        </div>
      );
    }
  }
}

export default withRouter(Login);
