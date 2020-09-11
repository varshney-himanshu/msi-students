import React, { Component } from "react";
import axios from "axios";
import { extractDateString } from "../../utils/utils";
import Timer from "../Timer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import "./Event.css";
import Loader from "../layout/Loader";
import api from "../../config/keys";
import roles from "../../config/Roles";
import Layout from "../layout/Layout";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      event: {},
      loading: true,
      isRegistered: false,
      deadlineEnded: false,
      member2: "",
      member3: "",
      member4: "",
      member5: "",
      teamName: "",
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
      };
    }
  }

  de = () => {
    let now = new Date();
    return new Date(this.state.event.deadline) - now <= 0;
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const auth = this.props.auth;

    axios
      .get(`${api}/event/${id}`)
      .then((res) => {
        if (res.data) {
          this.setState({ event: res.data, loading: false }, () => {
            this.setState({ deadlineEnded: this.de() });
            if (auth.isAuthenticated) {
              if (res.data.type === "MULTIPLE") {
                const { usersRegistered } = this.state.event;

                const ifRegistered = usersRegistered.filter(
                  (team) =>
                    team.Member_1_Email === auth.user.email ||
                    team.Member_2_Email === auth.user.email ||
                    team.Member_3_Email === auth.user.email ||
                    team.Member_4_Email === auth.user.email ||
                    team.Member_5_Email === auth.user.email
                );

                if (ifRegistered.length > 0) {
                  this.setState({ isRegistered: true });
                }
              } else {
                const { usersRegistered } = this.state.event;
                const ifRegistered = usersRegistered.filter(
                  (user) => user.user.toString() === this.state.auth.user.id
                );

                if (ifRegistered.length > 0) {
                  this.setState({ isRegistered: true });
                }
              }
            }
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickRegisterSingle = () => {
    const { user, isAuthenticated } = this.state.auth;
    if (isAuthenticated) {
      if (user.isProfileCreated) {
        const { _id } = this.state.event;
        const user_id = this.state.auth.user.id;
        // console.log(user_id);
        axios.get(`${api}/profile/${user_id}`).then((res) => {
          if (res.data) {
            // console.log(res.data);
            axios
              .post(`${api}/event/${_id}/register-user`, { user: res.data })
              .then((res) => {
                if (res.data) {
                  this.setState({ isRegistered: true });
                  axios
                    .put(`${api}/profile/add-registered-event/id`, {
                      eventId: _id,
                    })
                    .then((res) => {
                      if (res.data) {
                        console.log("registered!");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((err) => console.log(err));
          }
        });
      } else {
        alert("Please create your profile to register on an event.");
        this.props.history.push("/dashboard/profile");
      }
    } else {
      this.props.history.push("/login");
    }
  };

  toggleTeamForm = () => {
    const { isAuthenticated } = this.state.auth;
    if (isAuthenticated) {
      const { event } = this.state;
      const form = document.querySelector(`#team-${event._id.toString()}`);
      form.classList.toggle("team-register-show");
    } else {
      this.props.history.push("/login");
    }
  };

  CloseMultiForm = () => {
    const { event } = this.state;
    const form = document.querySelector(`#team-${event._id.toString()}`);
    form.classList.remove("team-register-show");
  };

  onClickRegisterMultiple = (e) => {
    e.preventDefault();
    const { user } = this.state.auth;

    if (user.isProfileCreated) {
      const { auth, event, teamName } = this.state;
      const { _id } = this.state.event;
      let users = [];
      users.push(auth.user.email);

      for (let i = 0; i < event.members - 1; i++) {
        users.push(this.state[`member${i + 2}`]);
      }
      // console.log(users);
      axios
        .post(`${api}/profile/emails`, {
          emails: users,
        })
        .then((res) => {
          if (res.data) {
            const { _id } = this.state.event;
            let registerData = {};
            registerData.teamName = teamName;
            res.data.map((profile, i) => {
              registerData[`Member_${i + 1}_Name`] = profile.fullName;
              registerData[`Member_${i + 1}_Email`] = profile.email;
              registerData[`Member_${i + 1}_Phone`] = profile.phone;
              registerData[`Member_${i + 1}_E_ID`] = profile.enrollment_id;
              registerData[`Member_${i + 1}_Course`] = profile.course;
              registerData[`Member_${i + 1}_Institute`] = profile.institute;
            });

            axios
              .post(`${api}/event/${_id}/register-user`, {
                user: registerData,
                type: event.type,
              })
              .then((res) => {
                if (res.data) {
                  this.setState({ isRegistered: true });
                  this.CloseMultiForm();
                  users.forEach((email) => {
                    axios
                      .put(`${api}/profile/add-registered-event/email`, {
                        email,
                        eventId: _id,
                      })
                      .then((res) => {
                        if (res.data) {
                          console.log("success");
                        }
                      })
                      .catch((err) => console.log(err));
                  });
                }
              });
          }
        });
    } else {
      alert("Please create your profile to register on an event.");
      this.props.history.push("/dashboard/profile");
    }
  };
  endDeadline = () => {
    this.setState({ deadlineEnded: this.de() });
  };

  render() {
    const { event, loading, auth, deadlineEnded, isRegistered } = this.state;

    let registerButton = <></>;

    if (event.type === "MULTIPLE") {
      registerButton = (
        <button onClick={this.toggleTeamForm} className="button-secondary">
          Submit Team
        </button>
      );
    } else {
      registerButton = (
        <button
          className="button-secondary"
          onClick={this.onClickRegisterSingle}
        >
          Register
        </button>
      );
    }

    if (loading) {
      return <Loader />;
    } else {
      return (
        <Layout>
          <div className="">
            {event.type === "MULTIPLE" && (
              <div
                id={`team-${event._id.toString()}`}
                className="team-register"
              >
                <button
                  type="button"
                  className="team-register__close"
                  onClick={this.CloseMultiForm}
                >
                  x
                </button>
                <form className="form" onSubmit={this.onClickRegisterMultiple}>
                  <h1 className="heading-primary">
                    Submit Team ({`${event.members} Members`})
                  </h1>

                  <br />
                  <hr className="hr ma" />
                  <br />
                  <div>
                    <strong>Leader: </strong>
                    {auth.user.email}
                  </div>
                  {[...Array(event.members - 1)].map((e, i) => (
                    <>
                      <input
                        type="email"
                        name={`member${i + 2}`}
                        placeholder={`Email of team member ${i + 2}`}
                        onChange={this.onChange}
                        required
                      />
                      <br />
                    </>
                  ))}

                  <input
                    type="text"
                    name="teamName"
                    placeholder="Team Name"
                    onChange={this.onChange}
                    value={this.state.teamName}
                  ></input>
                  <br />
                  <button className="button-secondary">Submit</button>
                  <br />
                  <small>
                    *Note: Please make sure all the members are registered to
                    the website before you submit.
                  </small>
                </form>
              </div>
            )}
            <div className="event-page">
              <div className="event">
                <div className="event__header">
                  <h1>{event.title}</h1>
                  <small>
                    {event.type === "MULTIPLE" ? "Team Event" : "Single Event"}
                  </small>
                  {isRegistered && (
                    <div className="event__header__registered">
                      <small>registered</small>
                    </div>
                  )}

                  {deadlineEnded && (
                    <div className="event__header__registration-closed">
                      <small>registration closed</small>
                    </div>
                  )}
                  <div className="event-image">
                    <img src={event.image.image_url} />
                  </div>
                </div>
                <p className="event-date">
                  <strong>Date: </strong> {extractDateString(event.date)}
                  <br />
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p>{event.description}</p>

                {!deadlineEnded && (
                  <div className="event-deadline">
                    <Timer
                      deadline={event.deadline}
                      endDeadline={this.endDeadline}
                    />
                  </div>
                )}
                <div className="event__footer">
                  {deadlineEnded ? null : (
                    <>
                      {auth.user.role === roles.student ||
                      auth.user.role === roles.mod ||
                      auth.isAuthenticated === false
                        ? registerButton
                        : null}
                    </>
                  )}

                  {auth.isAuthenticated &&
                  (auth.user.id === event.creator.creator_id ||
                    auth.user.role === roles.admin ||
                    auth.user.role === roles.mod) ? (
                    <button
                      className="button-secondary"
                      onClick={() =>
                        this.props.history.push(
                          `/event/${this.props.match.params.id}/registered`
                        )
                      }
                    >
                      Users Registered
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(withRouter(Event));
