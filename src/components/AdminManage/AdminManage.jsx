import React, { Component } from "react";
import "./AdminManage.css";
import { withRouter, Redirect } from "react-router-dom";

class AdminManage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }
  componentDidMount() {
    // console.log(localStorage.getItem("user"));
    if (localStorage.getItem("accountType") !== "admin") {
      this.setState({ redirect: "/admin/login" });
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <div className="right-text-small">{this.props.displayName}</div>
          <div className="right-text-large">Manage</div>
          {/* <div>Account Type: {localStorage.getItem("accountType")}</div>
          <div>UID: {localStorage.getItem("user")}</div> */}
        </div>
      );
    }
  }
}

export default withRouter(AdminManage);
