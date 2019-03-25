import React, { Component } from "react";
import "./OrderHistory.css";
import { withRouter, Redirect } from "react-router-dom";

class OrderHistory extends Component {
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

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <div className="welcome-text">Welcome {this.props.displayName}!</div>
        </div>
      );
    }
  }
}

export default withRouter(OrderHistory);
