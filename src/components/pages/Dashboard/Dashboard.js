import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getHomeImages, getAllEvents } from "../../../actions/dataActions";

import axios from "axios";
// import "./Dashboard.css";
import { extractDateString } from "../../../utils/utils";
import Loader from "../../layout/Loader";
import roles from "../../../config/Roles";

import API from "../../../config/keys";
import Layout from "../../layout/Layout";

import Events from "./Events";
import HomeImages from "./HomeImages";
import Notes from "./Notes";
import Notice from "./Notice";
import Users from "./Users";
import Profile from "./Profile";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      eventsLoading: true,
      userEvents: [],
      allEvents: [],
      registeredEvents: [],
      event: "",
      homeimages: [],
      auth: {},
      profile: {},
      allNotes: [],
      userNotes: [],
      profileLoading: true,
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;

    if (user.role !== roles.student) {
      this.getAllEventsDashboard();
    }

    this.getUserEvents();
    this.getProfileData();
    this.getUserNotes();
    this.getAllNotes();
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
          this.setState({ userEvents: res.data, eventsLoading: false });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  getUserNotes = () => {
    axios
      .get(`${API}/user/notes`)
      .then((res) => {
        if (res.data) {
          this.setState({ userNotes: res.data });
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
          this.setState({ allEvents: res.data, eventsLoading: false });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  getAllNotes = () => {
    axios
      .get(`${API}/note/all`)
      .then((res) => {
        if (res.data) {
          this.setState({ allNotes: res.data });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  approveEvent = (id) => {
    const { auth } = this.state;

    const data = {
      user_id: auth.user.id,
      user_name: auth.user.name,
    };
    axios
      .put(`${API}/event/${id}/approve`, data)
      .then((res) => {
        if (res.data) {
          this.getAllEventsDashboard();
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
    // console.log(data);
  };

  approveNote = (id) => {
    const { auth } = this.state;

    const data = {
      user_id: auth.user.id,
      user_name: auth.user.name,
    };
    axios
      .put(`${API}/note/${id}/approve`, data)
      .then((res) => {
        if (res.data) {
          this.notesReload();
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
    // console.log(data);
  };

  eventsReload = () => {
    this.getAllEventsDashboard();
    this.getUserEvents();
    this.getProfileData();
  };

  notesReload = () => {
    this.getAllNotes();
    this.getUserNotes();
  };

  onClickDeleteEvent = (id) => {
    if (window.confirm("Are you sure, you want to delete this event?")) {
      axios.delete(`${API}/event/${id}`).then((res) => {
        if (res.data) {
          this.eventsReload();
        }
      });
    }
  };

  deleteNote = (id) => {
    if (window.confirm("Are you sure, you want to delete this event?")) {
      axios.delete(`${API}/note/${id}`).then((res) => {
        if (res.data) {
          this.notesReload();
        }
      });
    }
  };

  getProfileData() {
    axios
      .get(`${API}/user`)
      .then((res) => {
        if (res.data) {
          axios
            .get(`${API}/profile`)
            .then((res) => {
              if (res) {
                const profile = res.data;
                this.setState({ profile, profileLoading: false });
                axios
                  .post(`${API}/event/ids`, {
                    registered: profile.registered,
                  })
                  .then((res) => {
                    if (res.data) {
                      this.setState({
                        registeredEvents: res.data,
                      });
                    }
                  });
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  onClickDeleteHomeImage = (id) => {
    if (window.confirm("are you sure, you want to delete this image?")) {
      axios.delete(`${API}/image/home/${id}`).then((res) => {
        if (res.data) {
          this.props.getHomeImages();
        }
      });
    }
  };

  changeRightSectionDisplay(toDisplay) {
    this.setState({ toDisplayRightSection: toDisplay });
  }

  render() {
    const {
      allEvents,
      userEvents,
      auth,
      allNotes,
      userNotes,
      homeimages,
      registeredEvents,
      profile,
      profileLoading,
    } = this.state;

    const toDisplayRightSection = this.props.match.params.endpoint;

    if (toDisplayRightSection === "profile") {
      this._toRender = (
        <Profile
          profile={profile}
          user={auth.user}
          history={this.props.history}
          loading={profileLoading}
        />
      );
    } else if (toDisplayRightSection === "events") {
      this._toRender = (
        <Events
          allEvents={allEvents}
          userEvents={userEvents}
          registeredEvents={registeredEvents}
          deleteEvent={this.onClickDeleteEvent}
          history={this.props.history}
          approveEvent={this.approveEvent}
          auth={this.state.auth}
        />
      );
    } else if (toDisplayRightSection === "notes") {
      this._toRender = (
        <Notes
          allnotes={allNotes}
          userNotes={userNotes}
          deleteNote={this.deleteNote}
          approveNote={this.approveNote}
          auth={auth}
          history={this.props.history}
        />
      );
    } else if (toDisplayRightSection === "homeimages") {
      this._toRender = (
        <HomeImages
          images={homeimages}
          history={this.props.history}
          deleteImage={this.onClickDeleteHomeImage}
        />
      );
    } else if (toDisplayRightSection === "notice") {
      this._toRender = <Notice />;
    } else if (toDisplayRightSection === "users") {
      this._toRender = <Users />;
    }

    return (
      <Layout>
        <div className="dashboard">
          <div className="row">
            <div className="col col-12 col-md-2 dashboard__left-section">
              <h3>Dashboard</h3>

              <div className="dashboard__left-section__user-info">
                <h6>{auth.user.name}</h6>
                <small>{auth.user.role}</small>
              </div>

              <div className="dashboard__left-section__dashboard-nav">
                {auth.user.role !== roles.admin && (
                  <div
                    className="dashboard__left-section__dashboard-nav__button"
                    onClick={() =>
                      this.props.history.push("/dashboard/profile")
                    }
                  >
                    profile
                  </div>
                )}

                <div
                  className="dashboard__left-section__dashboard-nav__button"
                  onClick={() => this.props.history.push("/dashboard/events")}
                >
                  Events
                </div>
                <div
                  className="dashboard__left-section__dashboard-nav__button"
                  onClick={() => this.props.history.push("/dashboard/notes")}
                >
                  Notes
                </div>
                {auth.user.role === roles.admin && (
                  <>
                    <div
                      className="dashboard__left-section__dashboard-nav__button"
                      onClick={() =>
                        this.props.history.push("/dashboard/users")
                      }
                    >
                      Users
                    </div>
                    <div
                      className="dashboard__left-section__dashboard-nav__button"
                      onClick={() =>
                        this.props.history.push("/dashboard/homeimages")
                      }
                    >
                      Home images
                    </div>
                    <div
                      className="dashboard__left-section__dashboard-nav__button"
                      onClick={() =>
                        this.props.history.push("/dashboard/notice")
                      }
                    >
                      Notice
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col col-12 col-md-10 dashboard__right-section">
              {this._toRender}
            </div>
          </div>
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
