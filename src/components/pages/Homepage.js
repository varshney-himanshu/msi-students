import React, { Component } from "react";
// import "./Homepage.css";
import { connect } from "react-redux";
import Slider from "../layout/Slider";
import Notice from "../layout/Notice";
import EventCard from "./EventCard/EventCard";
import Layout from "../layout/Layout";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeimages: [],
      notice: {},
      events: [],
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.homeimages) {
      return {
        homeimages: props.homeimages,
        notice: props.notice,
        events: props.events,
      };
    }
  }

  render() {
    const { homeimages, notice, events } = this.state;
    // console.log(homeimages);
    return (
      <Layout>
        <div className="homepage">
          <div className="row homepage-content">
            <div className="col-md-9 main-container">
              <Slider imageFiles={homeimages} />
            </div>

            <div className="col-md-3 side-container">
              <Notice text={notice.text} />
              <hr />
              <div className="latest-event">
                <small>Latest Event</small>
                <EventCard event={events[0]} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  homeimages: state.data.homeimages,
  notice: state.data.notice,
  events: state.data.allEvents,
});

export default connect(mapStateToProps, null)(Homepage);
