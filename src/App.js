import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

//Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
// import "firebase/functions";
import "firebase/auth";

import Navbar from "./components/Navbar/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Home from "./components/Home/Home";
import OrderFlavor from "./components/OrderFlavor/OrderFlavor";
import OrderTopping from "./components/OrderTopping/OrderTopping";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminManage from "./components/AdminManage/AdminManage";
import Login from "./components/Login/Login";
import Background from "./BG.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideDrawerOpened: false
    };

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAlZj7e4TVdRqcbq4CDjUVsQYzGUhfpWls",
      authDomain: "hyperbola-a8e60.firebaseapp.com",
      databaseURL: "https://hyperbola-a8e60.firebaseio.com",
      projectId: "hyperbola-a8e60",
      storageBucket: "hyperbola-a8e60.appspot.com",
      messagingSenderId: "739584029621"
    };

    firebase.initializeApp(config);
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  // componentWillUnmount() {
  //   this.unregisterAuthObserver();
  // }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        localStorage.setItem("user", user.uid);
        console.log(firebase.auth().currentUser);
        // console.log(firebase.auth().currentUser.email);
        this.setState({ name: firebase.auth().currentUser.displayName });
      } else {
        // this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("accountType");
      }
    });
  }

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpened: !prevState.sideDrawerOpened };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpened: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpened) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div className="App" style={{ height: "100%" }}>
        <div className="background">
          <img src={Background} alt="" />
        </div>
        {backdrop}
        <Navbar drawerClickHandler={this.drawerToggleHandler} />
        <SideDrawer
          show={this.state.sideDrawerOpened}
          drawerClickHandler={this.drawerToggleHandler}
          displayName={this.state.name}
          db={firebase}
        />
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" render={props => <Home db={firebase} />} />
            <Route
              exact
              path="/login"
              render={props => <Login db={firebase} />}
            />
            <Route
              exact
              path="/user/history"
              render={props => (
                <OrderHistory db={firebase} displayName={this.state.name} />
              )}
            />
            <Route exact path="/order/flavor" component={OrderFlavor} />
            <Route exact path="/order/topping" component={OrderTopping} />
            <Route exact path="/order/summary" component={OrderSummary} />
            <Route
              exact
              path="/admin/login"
              render={props => <AdminLogin db={firebase} />}
            />
            <Route
              exact
              path="/admin/manage"
              render={props => (
                <AdminManage db={firebase} displayName={this.state.name} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
