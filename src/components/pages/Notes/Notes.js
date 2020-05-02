import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import Card from "../../Card";

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      departments: [],
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        departments: props.departments,
      };
    }
  }

  onClickCard = (dep_id) => {
    this.props.history.push(`/notes/${dep_id}`);
  };

  render() {
    return (
      <Layout>
        <div className="departments">
          <h1 className="heading-primary">Departments</h1>
          <hr className="hr" />
          <div className="container">
            <div className="row">
              {this.state.departments.map((department) => (
                <div className="col col-6 col-md-2">
                  <Card
                    title={department.title}
                    details={department.semesterCount.toString() + " Semesters"}
                    onClick={() => this.onClickCard(department._id)}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  departments: state.departments.data,
});

export default connect(mapStateToProps, {})(Notes);
