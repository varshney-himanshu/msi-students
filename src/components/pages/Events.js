import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllEvents } from "../../actions/dataActions";
// import "./Events.css";
import EventCard from "./EventCard/EventCard";
import Layout from "../layout/Layout";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.events) {
      return {
        events: props.events,
      };
    }
  }
  componentDidMount() {
    this.props.getAllEvents();
  }

  render() {
    const { events } = this.state;
    return (
      <Layout>
        <div className="events">
          <h1 className="heading-primary">Events</h1>
          <hr className="hr" />
          <div className="row">
            {events.map((event, index) => (
              <div className="col col-12 col-md-3">
                <EventCard key={index + event._id} event={event} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.data.allEvents,
});
export default connect(mapStateToProps, { getAllEvents })(Events);
