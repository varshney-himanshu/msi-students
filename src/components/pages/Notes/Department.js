import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../config/keys";
import axios from "axios";
import Layout from "../../layout/Layout";
import Card from "../../Card";
import Loader from "../../layout/Loader";

class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      semesters: [],
      isSemestersLoaded: false,
    };
  }

  async componentDidMount() {
    const dep_id = this.props.match.params.department;

    const response = await axios.get(`${api}/department/${dep_id}/semesters`);
    this.setState({ semesters: response.data, isSemestersLoaded: true });
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        departments: props.departments,
      };
    }
  }

  onClickCard = (dep_id, semester_id) => {
    this.props.history.push(`/notes/${dep_id}/${semester_id}`);
  };

  render() {
    const { isSemestersLoaded, semesters } = this.state;
    if (!isSemestersLoaded) {
      return <Loader />;
    } else {
      return (
        <Layout>
          <div className="semesters">
            <h1 className="heading-primary">Semesters</h1>
            <hr className="hr" />
            <div className="container">
              <div className="row">
                {semesters.map((semester) => (
                  <div className="col col-6 col-md-2">
                    <Card
                      title={semester.title}
                      details={semester.subjectCount.toString() + " Subjects"}
                      onClick={() =>
                        this.onClickCard(
                          semester.department.department_id,
                          semester._id
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

export default connect(mapStateToProps, {})(Department);
