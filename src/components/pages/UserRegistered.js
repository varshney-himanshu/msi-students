import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import FileDownload from "js-file-download";
import "./UserRegistered.css";
import Loader from "../layout/Loader";
import api from "../../config/keys";

class UserRegistered extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      event: {},
      usersRegistered: [],
      loading: true,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`${api}/event/${id}`).then((res) => {
      if (res.data) {
        this.setState({
          event: res.data,
          usersRegistered: res.data.usersRegistered,
          loading: false,
        });
      }
    });
  }
  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
      };
    }
  }

  onClickDownload = () => {
    const { usersRegistered } = this.state.event;
    axios
      .post(`${api}/event/download-teams-registered`, {
        registerData: usersRegistered,
        members: this.state.event.members,
        type: this.state.event.type,
      })
      .then((res) => {
        if (res) {
          FileDownload(res.data, "registered.csv");
        }
      });
  };

  render() {
    const { loading, usersRegistered, event } = this.state;

    if (loading) {
      return <Loader />;
    } else {
      if (event.type === "MULTIPLE") {
        return (
          <div className="user-registered">
            <div className="container">
              <table>
                <tr>
                  <th>Team Name</th>
                  {[...Array(event.members)].map((e, i) => (
                    <>
                      <th>{`Member ${i + 1} Name`}</th>
                      <th>{`Member ${i + 1} Email`}</th>
                      <th>{`Member ${i + 1} Phone`}</th>
                      <th>{`Member ${i + 1} E.ID`}</th>
                      <th>{`Member ${i + 1} Course`}</th>
                      <th>{`Member ${i + 1} Institute`}</th>
                    </>
                  ))}
                </tr>
                {usersRegistered.map((team, i) => (
                  <tr>
                    <td>{team[`teamName`]}</td>
                    {[...Array(event.members)].map((e, i) => (
                      <>
                        <td>{team[`Member_${i + 1}_Name`]}</td>
                        <td>{team[`Member_${i + 1}_Email`]}</td>
                        <td>{team[`Member_${i + 1}_Phone`]}</td>
                        <td>{team[`Member_${i + 1}_E_ID`]}</td>
                        <td>{team[`Member_${i + 1}_Course`]}</td>
                        <td>{team[`Member_${i + 1}_Institute`]}</td>
                      </>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
            <button className="export-as-csv" onClick={this.onClickDownload}>
              Export as .csv
            </button>
          </div>
        );
      } else {
        return (
          <div className="user-registered">
            <div className="container">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Enrollment No.</th>
                  <th>Institute</th>
                  <th>Course</th>
                  <th>Phone</th>
                </tr>
                {usersRegistered.map((profile) => (
                  <tr>
                    <td>{profile.fullName}</td>
                    <td>{profile.email}</td>
                    <td>{profile.enrollment_id}</td>
                    <td>{profile.institute}</td>
                    <td>{profile.course}</td>
                    <td>{profile.phone}</td>
                  </tr>
                ))}
              </table>
            </div>
            <button className="export-as-csv" onClick={this.onClickDownload}>
              Export as .csv
            </button>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(UserRegistered);
