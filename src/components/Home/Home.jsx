import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Home.css";
import GearIcon from "./gear_icon.svg";
import ArtsIcon from "./arts_icon.svg";
import SalaIcon from "./sala_icon.svg";
import GoogleMapReact from "google-map-react";
import AriaTabPanel from "react-aria-tabpanel";
import Arrow from "./down-arrow.svg";
import UpArrow from "./up-arrow.svg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEng: false,
      showArts: false,
      showSala: false,
      activeTabEngineering: "t1",
      activeTabArts: "t1",
      activeTabSalaphrakeaw: "t1",
      engAvailableFlavor: [],
      engCurrentQueue: [],
      engNumCurrentQueue: ""
    };

    this.showEngineeing = this.showEngineeing.bind(this);
    this.showArts = this.showArts.bind(this);
    this.showSalaphrakeaw = this.showSalaphrakeaw.bind(this);
    this.setTabEngineering = this.setTabEngineering.bind(this);
    this.setTabArts = this.setTabArts.bind(this);
    this.setTabSalaphrakeaw = this.setTabSalaphrakeaw.bind(this);
    this.orderEngineering = this.orderEngineering.bind(this);
  }

  //For Map
  static defaultProps = {
    center: {
      lat: 13.7369859,
      lng: 100.5309912
    },
    zoom: 15
  };

  //Firestore
  componentDidMount() {
    //Get available flavor using Firestore
    var firestore = this.props.db.firestore();
    var engFlavor = [];
    firestore
      .collection("flavor")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //Get available flavors
          if (doc.data().status) {
            engFlavor.push(doc.data().flavor_name);
          }
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    //setstate of available flavors
    this.setState({ engAvailableFlavor: engFlavor });

    //Get current queue with realtime database
    let currentQueue = this.props.db.database().ref("queue");
    currentQueue.on("value", snapshot => {
      var queueData = snapshot.val();

      //Add current available data to array
      var currentQueueData = [];

      for (var i in queueData) {
        if (queueData[i] !== queueData.total_queue) {
          currentQueueData.push([
            queueData[i].flavor.charAt(0).toUpperCase() +
              queueData[i].flavor.slice(1) +
              ", " +
              queueData[i].topping +
              " topping(s)",
            queueData[i].status.charAt(0).toUpperCase() +
              queueData[i].status.slice(1),
            queueData[i].number + "."
          ]);
        }
      }
      this.setState({
        engCurrentQueue: currentQueueData,
        engNumCurrentQueue: queueData.total_queue
      });
    });
  }

  setTabEngineering(newActiveTabId) {
    this.setState({ activeTabEngineering: newActiveTabId });
  }
  setTabArts(newActiveTabId) {
    this.setState({ activeTabArts: newActiveTabId });
  }
  setTabSalaphrakeaw(newActiveTabId) {
    this.setState({ activeTabSalaphrakeaw: newActiveTabId });
  }

  showEngineeing() {
    if (this.state.showEng === true) {
      this.setState({ showEng: false });
    } else {
      this.setState({ showEng: true });
    }
  }

  orderEngineering() {
    this.props.history.push("/order/flavor");
  }

  showArts() {
    if (this.state.showArts === true) {
      this.setState({ showArts: false });
    } else {
      this.setState({ showArts: true });
    }
  }

  showSalaphrakeaw() {
    if (this.state.showSala === true) {
      this.setState({ showSala: false });
    } else {
      this.setState({ showSala: true });
    }
  }

  // RENDER /////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const flavors = Array.from(this.state.engAvailableFlavor).map(
      (flavor, i) => <li key={i}>{flavor}</li>
    );

    const queues = Array.from(this.state.engCurrentQueue).map((queue, i) => {
      let statusStyle = "queue-status";
      statusStyle += queue[1] === "Finished" ? " finished" : " waiting";
      return (
        <li className="mg-bot" key={i}>
          {queue[2]} {queue[0]}
          <div className={statusStyle}>{queue[1]}</div>
          <hr />
        </li>
      );
    });

    let tabDescriptions = [
      {
        title: "Available Now",
        id: "t1",
        content: <div>{flavors}</div>
      },
      {
        title: "Queue",
        id: "t2",
        content: <div className="nobp">{queues}</div>
      }
    ];

    const {
      activeTabEngineering,
      activeTabArts,
      activeTabSalaphrakeaw
    } = this.state;

    const upArrow = (
      <img className="arrow" src={UpArrow} alt="" height="12" width="12" />
    );

    const downArrow = (
      <img className="arrow" src={Arrow} alt="" height="12" width="12" />
    );

    const tabsEngineering = tabDescriptions.map((tabDescription, i) => {
      let innerCl = "Tabs-tabInner";
      if (tabDescription.id === activeTabEngineering) innerCl += " is-active";
      return (
        <li className="Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className="Tabs-tab"
            active={tabDescription.id === activeTabEngineering}
          >
            <div className={innerCl}>{tabDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panelsEngineering = tabDescriptions.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTabEngineering}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const tabsArts = tabDescriptions.map((tabDescription, i) => {
      let innerCl = "Tabs-tabInner";
      if (tabDescription.id === activeTabArts) innerCl += " is-active";
      return (
        <li className="Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className="Tabs-tab"
            active={tabDescription.id === activeTabArts}
          >
            <div className={innerCl}>{tabDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panelsArts = tabDescriptions.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTabArts}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const tabsSalaphrakeaw = tabDescriptions.map((tabDescription, i) => {
      let innerCl = "Tabs-tabInner";
      if (tabDescription.id === activeTabSalaphrakeaw) innerCl += " is-active";
      return (
        <li className="Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className="Tabs-tab"
            active={tabDescription.id === activeTabSalaphrakeaw}
          >
            <div className={innerCl}>{tabDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panelsSalaphrakeaw = tabDescriptions.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTabSalaphrakeaw}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const engInfo = (
      <div className="info_box">
        <br />
        <div className="info_box--small">
          <AriaTabPanel.Wrapper
            onChange={this.setTabEngineering.bind(this)}
            activeTabId={this.state.activeTabEngineering}
          >
            <AriaTabPanel.TabList>
              <ul className="Tabs-tablist">{tabsEngineering}</ul>
            </AriaTabPanel.TabList>
            <div className="Tabs-panel">{panelsEngineering}</div>
          </AriaTabPanel.Wrapper>
        </div>
        <button className="purple_button" onClick={this.orderEngineering}>
          ORDER NOW!
        </button>
        <div />
        <br />
      </div>
    );
    const artsInfo = (
      <div className="info_box">
        <br />
        <div className="info_box--small">
          <AriaTabPanel.Wrapper
            onChange={this.setTabArts.bind(this)}
            activeTabId={this.state.activeTabArts}
          >
            <AriaTabPanel.TabList>
              <ul className="Tabs-tablist">{tabsArts}</ul>
            </AriaTabPanel.TabList>
            <div className="Tabs-panel">{panelsArts}</div>
          </AriaTabPanel.Wrapper>
        </div>
        <button className="purple_button">ORDER NOW!</button>
        <div />
        <br />
      </div>
    );
    const salaInfo = (
      <div className="info_box">
        <br />
        <div className="info_box--small">
          <AriaTabPanel.Wrapper
            onChange={this.setTabSalaphrakeaw.bind(this)}
            activeTabId={this.state.activeTabSalaphrakeaw}
          >
            <AriaTabPanel.TabList>
              <ul className="Tabs-tablist">{tabsSalaphrakeaw}</ul>
            </AriaTabPanel.TabList>
            <div className="Tabs-panel">{panelsSalaphrakeaw}</div>
          </AriaTabPanel.Wrapper>
        </div>
        <button className="purple_button">ORDER NOW!</button>
        <div />
        <br />
      </div>
    );

    const engineering = (
      <div className="faculty-bar" onClick={this.showEngineeing}>
        <img src={GearIcon} style={{ width: "53px" }} alt="Gear" />
        <div className="space-between" />
        <div className="white-text">&nbsp;&nbsp;Engineering</div>
        <div className="space" />
        <div className="white-text-right">
          {this.state.engNumCurrentQueue} &nbsp; &nbsp; &nbsp; queue
        </div>
        {this.state.showEng ? upArrow : downArrow}
      </div>
    );

    const arts = (
      <div className="faculty-bar" onClick={this.showArts}>
        <img src={ArtsIcon} style={{ width: "53px" }} alt="Gear" />
        <div className="space-between" />
        <div className="white-text">Arts</div>
        <div className="space" />
        <div className="white-text-right">7 &nbsp; &nbsp; &nbsp; queue</div>
        {this.state.showArts ? upArrow : downArrow}
      </div>
    );

    const salaphrakeaw = (
      <div className="faculty-bar" onClick={this.showSalaphrakeaw}>
        <img src={SalaIcon} style={{ width: "53px" }} alt="Gear" />
        <div className="space-between" />
        <div className="white-text">Phrakeaw</div>
        <div className="space" />
        <div className="white-text-right">10 &nbsp; &nbsp; &nbsp; queue</div>
        {this.state.showSala ? upArrow : downArrow}
      </div>
    );

    return (
      <div>
        {/* <div className="bar">
          <div className="big-purple-text">Queue Status</div>
        </div> */}
        {engineering}
        {this.state.showEng ? engInfo : " "}
        <div className="separator" />

        {arts}
        {this.state.showArts ? artsInfo : " "}
        <div className="separator" />

        {salaphrakeaw}
        {this.state.showSala ? salaInfo : " "}
        <div className="separator" />
        <br />
        <p />

        <div className="big-purple-text">Hyperbola Nearby</div>
        <div className="gmap">
          <GoogleMapReact
            // bootstrapURLKeys={{
            //   key: "KEY"
            // }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
