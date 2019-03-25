import React, { Component } from "react";
import "./UserInfo.css";
import { withRouter, Redirect } from "react-router-dom";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  componentDidMount() {
    // console.log(this.props.db.auth());
    // this.props.db.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // console.log(user);
    //     console.log(this.props.db.auth().currentUser.email);
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
    // });
    // console.log(this.props.displayName);
  }

  render() {
    // var loggedInUser = this.props.db.auth();
    var x = this.props.profilePic;
    if (x.includes("facebook.com")) {
      x += "?height=500";
    } else if (x.includes("twimg.com")) {
      x = x.substring(0, x.lastIndexOf("_")) + ".jpg";
    }

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <div className="welcome-text">Welcome {this.props.displayName}!</div>
          <img
            src={x}
            alt=""
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        </div>
      );
    }
  }
}

export default withRouter(UserInfo);
