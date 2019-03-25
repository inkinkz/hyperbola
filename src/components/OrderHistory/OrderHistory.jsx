import React, { Component } from "react";
import "./OrderHistory.css";
import { withRouter, Redirect } from "react-router-dom";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  componentDidMount() {}

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <div className="welcome-text">
            {this.props.displayName}'s Order History
          </div>
        </div>
      );
    }
  }
}

export default withRouter(OrderHistory);
