import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
// import "./Profile.css";
import Loader from "../layout/Loader";
import { extractDateString } from "../../utils/utils";
import API from "../../config/keys";
import Layout from "../layout/Layout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      profile: {},
      user: {},
      loading: true,
      events: [],
      isEventsLoading: true,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
      };
    }
  }

  componentDidMount() {
    const { auth } = this.state;
    if (!auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    if (auth.user.isProfileCreated) {
      axios
        .get(`${API}/user`)
        .then((res) => {
          if (res.data) {
            axios
              .get(`${API}/profile`)
              .then((res) => {
                if (res) {
                  this.setState({ profile: res.data, loading: false });
                  const profile = res.data;
                  axios
                    .post(`${API}/event/ids`, {
                      registered: profile.registered,
                    })
                    .then((res) => {
                      if (res.data) {
                        this.setState({
                          isEventsLoading: false,
                          events: res.data,
                        });
                      }
                    });
                }
              })
              .catch((err) => console.log(err));
            this.setState({ user: res.data });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, user, profile, isEventsLoading, events } = this.state;

    return (
      <Layout>
        <div className="profile" style={{ textAlign: "left" }}>
          {!loading ? (
            !user.isProfileCreated ? (
              <div className="create-profile">
                <p>
                  You need to create a profile to participate in events. Your
                  profile data is sent when you register on an event.
                </p>
                <button
                  onClick={() =>
                    this.props.history.push("/user/profile/create")
                  }
                >
                  Create Profile
                </button>
              </div>
            ) : (
              <div className="profile container">
                <div className="header">
                  <div className="profile-picture"></div>
                  <div className="username">
                    {user.name} <span className="role">({user.role})</span>
                    <span className="edit-profile">
                      <button
                        onClick={() => {
                          this.props.history.push("profile/edit");
                        }}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="body">
                  <div>
                    <span className="field">Name - </span>
                    <span className="value">{profile.fullName}</span>
                  </div>
                  <div>
                    <span className="field">Email - </span>
                    <span className="value">{user.email}</span>
                  </div>

                  <div>
                    <span className="field">Phone - </span>
                    <span className="value">{profile.phone}</span>
                  </div>
                  <div>
                    <span className="field">Enrollment ID - </span>
                    <span className="value"> {profile.enrollment_id}</span>
                  </div>
                  <div>
                    <span className="field">Course - </span>
                    <span className="value">
                      {profile.department.department_name}
                      {"    "}
                    </span>
                    <span className="field">Semester - </span>
                    <span className="value">
                      {profile.semester.semester_name.split(" ")[1]}{" "}
                    </span>
                    <span className="field">Section - </span>
                    <span className="value">{profile.section} </span>
                  </div>
                  <div>
                    <span className="field">Institute - </span>
                    <span className="value">{profile.institute}</span>
                  </div>
                </div>

                <div className="profile-events">
                  {isEventsLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <h2>Your Registered Events</h2>
                      <div className="profile-events-table">
                        {events.map((event, index) => (
                          <div
                            key={event._id + index}
                            className="profile-event row"
                          >
                            <div className="col col-12 col-sm-6 col-lg-5">
                              <span>{event.title}</span>
                            </div>

                            <div className="col col-12 col-sm-6 col-lg-4">
                              <span>Venue: </span>
                              {event.venue}
                            </div>
                            <div className="col col-12 col-sm-6 col-lg-2">
                              <span>Date: </span>
                              {extractDateString(event.date)}
                            </div>
                            <div className="col col-12 col-sm-6 col-lg-1">
                              <button
                                onClick={() => {
                                  this.props.history.push(
                                    `/event/${event._id}`
                                  );
                                }}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          ) : (
            <Loader />
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(Profile));
