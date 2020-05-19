import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../config/keys";
import axios from "axios";
import Layout from "../../layout/Layout";
import Card from "../../Card";
import Loader from "../../layout/Loader";

class Semester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      subjects: [],
      isSubjectsLoaded: false,
    };
  }

  async componentDidMount() {
    const sem_id = this.props.match.params.semester;
    // console.log(sem_id);
    const response = await axios.get(`${api}/semester/${sem_id}/subjects`);
    this.setState({ subjects: response.data, isSubjectsLoaded: true });
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        departments: props.departments,
      };
    }
  }

  onClickCard = (dep_id, sem_id, sub_id) => {
    this.props.history.push(`/notes/${dep_id}/${sem_id}/${sub_id}`);
  };

  render() {
    const { isSubjectsLoaded, subjects } = this.state;
    if (!isSubjectsLoaded) {
      return <Loader />;
    } else {
      return (
        <Layout>
          <div className="departments">
            <h1 className="dashboard__heading">Subjects</h1>
            <hr className="hr" />
            <div className="container">
              <div className="row">
                {subjects.map((subject) => (
                  <div className="col col-4 col-md-2">
                    <Card
                      title={subject.title}
                      details={subject.notesCount.toString() + " Notes"}
                      onClick={() =>
                        this.onClickCard(
                          subject.department.department_id,
                          subject.semester.semester_id,
                          subject._id
                        )
                      }
                    />
                  </div>
                ))}
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
  departments: state.departments.data,
});

export default connect(mapStateToProps, {})(Semester);
