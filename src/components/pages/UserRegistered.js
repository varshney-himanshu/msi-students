import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import FileDownload from "js-file-download";
// import "./UserRegistered.css";
import Loader from "../layout/Loader";
import api from "../../config/keys";
import Layout from "../layout/Layout";

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
          <Layout>
            <div className="users-registered">
              <h4 className="dashboard__heading">user registered</h4>
              <hr className="hr" />
              <table className="table users-registered__table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    {[...Array(event.members)].map((e, i) => (
                      <>
                        <th scope="col">{`Member ${i + 1} Name`}</th>
                        <th scope="col">{`Member ${i + 1} Email`}</th>
                        <th scope="col">{`Member ${i + 1} Phone`}</th>
                        <th scope="col">{`Member ${i + 1} E.ID`}</th>
                        <th scope="col">{`Member ${i + 1} Course`}</th>
                        <th scope="col">{`Member ${i + 1} Institute`}</th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usersRegistered.map((team, i) => (
                    <tr>
                      <td scope="row">{i + 1}</td>
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
                </tbody>
              </table>

              <button className="button-quad" onClick={this.onClickDownload}>
                Export as .csv
              </button>
            </div>
          </Layout>
        );
      } else {
        return (
          <Layout>
            <div className="users-registered">
              <div>
                <h4 className="dashboard__heading">user registered</h4>
                <hr className="hr" />
                <table className="table users-registered__table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Enrollment No.</th>
                      <th scope="col">Institute</th>
                      <th scope="col">Course</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersRegistered.map((profile, i) => (
                      <tr>
                        <td scope="row">{i + 1}</td>
                        <td>{profile.fullName}</td>
                        <td>{profile.email}</td>
                        <td>{profile.enrollment_id}</td>
                        <td>{profile.institute}</td>
                        <td>{profile.course}</td>
                        <td>{profile.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="button-quad" onClick={this.onClickDownload}>
                Export as .csv
              </button>
            </div>
          </Layout>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(UserRegistered);
