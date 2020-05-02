import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getHomeImages, getAllEvents } from "../../actions/dataActions";
import axios from "axios";
// import "./Dashboard.css";
import { extractDateString } from "../../utils/utils";
import Loader from "../layout/Loader";
import roles from "../../config/Roles";

import API from "../../config/keys";
import Layout from "../layout/Layout";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      eventsLoading: true,
      events: [],
      event: "",
      homeimages: [],
      auth: {},
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        homeimages: props.homeimages,
        auth: props.auth,
      };
    }
  }

  getUserEvents = () => {
    axios
      .get(`${API}/event/user/all`)
      .then((res) => {
        if (res.data) {
          this.setState({ events: res.data, eventsLoading: false });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  getAllEventsDashboard = () => {
    axios
      .get(`${API}/event/all`)
      .then((res) => {
        if (res.data) {
          this.setState({ events: res.data, eventsLoading: false });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  componentDidMount() {
    const { user } = this.props.auth;

    if (user.role !== roles.admin && user.role !== roles.mod) {
      this.props.history.push("/");
    }

    if (user.role === roles.admin) {
      this.getAllEventsDashboard();
    } else if (user.role === roles.mod) {
      this.getUserEvents();
    }
  }

  onClickDeleteEvent = (id) => {
    if (window.confirm("Are you sure, you want to delete this event?")) {
      axios.delete(`${API}/event/${id}`).then((res) => {
        if (res.data) {
          this.getAllEventsDashboard();
        }
      });
    }
  };

  onClickDelete = (id) => {
    if (window.confirm("are you sure, you want to delete this image?")) {
      axios.delete(`${API}/image/home/${id}`).then((res) => {
        if (res.data) {
          this.props.getHomeImages();
        }
      });
    }
  };

  render() {
    const { events, auth, eventsLoading, homeimages } = this.state;
    return (
      <Layout>
        <div className="dashboard">
          <h1 className="heading">
            Dashboard{" "}
            {auth.user.role === roles.mod ? (
              <span>(Moderator)</span>
            ) : auth.user.role === roles.admin ? (
              <span>(Admin)</span>
            ) : (
              <></>
            )}
          </h1>

          <div className="row">
            <div className="col col-12 col-md-10">
              <h2 className="heading">Your Events</h2>
              <div className="dashboard-events">
                {!eventsLoading ? (
                  <>
                    <div className="dashboard-events-body">
                      {events.map((event) => (
                        <div
                          key={event._id.toString()}
                          className="dashboard-event"
                        >
                          <div className="dashboard-event-title">
                            <strong>{event.title}</strong>
                          </div>
                          <div className="dashboard-event-venue">
                            <strong className="venue">Venue: </strong>
                            {event.venue}
                          </div>
                          <div className="dashboard-event-deadline">
                            <strong className="deadline">Deadline: </strong>
                            {extractDateString(event.deadline)}
                          </div>

                          <div className="dashboard-event-btns">
                            <button
                              onClick={() =>
                                this.props.history.push(
                                  "/event/" + event._id.toString()
                                )
                              }
                              className="button-dark-outline"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                this.props.history.push(
                                  `/event/edit/${event._id}`
                                );
                              }}
                              className="edit"
                            >
                              &#9998;
                            </button>
                            {auth.user.role === roles.admin ? (
                              <button
                                onClick={() =>
                                  this.onClickDeleteEvent(event._id)
                                }
                                className="delete"
                              >
                                &times;
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
            <div className="col col-12 col-md-2 dashboard-btns ">
              <button
                className="button-dark"
                onClick={() => this.props.history.push("/event/create")}
              >
                Add Event <strong>&#43;</strong>
              </button>

              {auth.user.role === roles.admin ? (
                <>
                  <button
                    className="button-dark"
                    onClick={() => this.props.history.push("/notice/add")}
                  >
                    Add Notice <strong>&#43;</strong>
                  </button>
                  <button
                    className="button-dark"
                    onClick={() => this.props.history.push("/dashboard/users")}
                  >
                    Handle Users
                  </button>
                  <button
                    className="button-dark"
                    onClick={() =>
                      this.props.history.push("/dashboard/home/image/add")
                    }
                  >
                    Add Home Image <strong>&#43;</strong>
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {auth.user.role === roles.admin ? (
            <div className="home-images">
              <h2 className="heading">Home Images/Events</h2>
              <hr></hr>
              <div className="images-thumbnails">
                {homeimages.map((file) => (
                  <div key={file.image.image_id} className="thumbnail">
                    <button
                      onClick={() => {
                        this.onClickDelete(file._id);
                      }}
                      className="img-delete-btn"
                    >
                      &#x292B;
                    </button>
                    <img src={file.image.image_url} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  homeimages: state.data.homeimages,
});
export default connect(mapStateToProps, { getHomeImages, getAllEvents })(
  withRouter(Dashboard)
);
