import React, { Component } from "react";
import "./UserInfo.css";
import { withRouter, Redirect } from "react-router-dom";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
    this.orderHistory = this.orderHistory.bind(this);
  }

  componentDidMount() {}

  orderHistory() {
    this.setState({ redirect: "/user/history" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      var x = this.props.profilePic;
      if (x.includes("facebook.com")) {
        x += "?height=500";
      } else if (x.includes("twimg.com")) {
        x = x.substring(0, x.lastIndexOf("_")) + ".jpg";
      }
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
          <button className="history-button" onClick={this.orderHistory}>
            Order History
          </button>
        </div>
      );
    }
  }
}

export default withRouter(UserInfo);
