import React, { Component } from "react";
import { connect } from "react-redux";
import { registerProfile } from "../../actions/dataActions";
// import { getCurrentUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import API from "../../config/keys";
import Layout from "../layout/Layout";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      name: "",
      institute: "",
      course: "",
      phone: "",
      enrollment_id: "",
      errors: {},
      section: "",
      semester: "",
      departments: [],
      semesters: [],
      department: "",
      isDepartmentSelected: false,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        errors: props.errors,
        departments: props.departments.data,
      };
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  getSemesters = async (department_id) => {
    try {
      const response = await Axios.get(
        `${API}/department/${department_id}/semesters`
      );
      // console.log(response.data);
      this.setState({ semesters: response.data, isDepartmentSelected: true });
    } catch (err) {
      console.log(err);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "department") {
      const department = JSON.parse(e.target.value);
      this.getSemesters(department._id);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      auth,
      institute,
      phone,
      enrollment_id,
      semester,
      section,
      department,
    } = this.state;
    const user = auth.user.id;
    const email = auth.user.email;
    const dep = JSON.parse(department);
    const sem = JSON.parse(semester);
    const data = {
      fullName: name,
      email,
      user,
      enrollment_id,
      phone,
      department_id: dep._id,
      department_name: dep.title,
      semester_id: sem._id,
      semester_name: sem.title,
      institute,
      section,
    };
    this.props.registerProfile(data, this.props.history);
  };

  render() {
    const { departments } = this.state;
    return (
      <Layout>
        <div className="create-profile">
          <form className="form" onSubmit={this.onSubmit}>
            <h3>Create Profile</h3>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Full Name"
              onChange={this.onChange}
              required
            />
            <br />
            <input
              type="text"
              name="enrollment_id"
              value={this.state.enrollment_id}
              placeholder="Enrollment ID"
              onChange={this.onChange}
              required
            />
            {this.state.errors.enrollment_id && this.state.errors.enrollment_id}
            <br />
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              placeholder="Phone Number"
              onChange={this.onChange}
              required
            />
            {this.state.errors.phone && this.state.errors.phone}
            <br />
            <select name="department" onChange={this.onChange} required>
              <option value="" selected disabled>
                Select Department
              </option>

              {departments.map((department) => (
                <option value={JSON.stringify(department)}>
                  {department.title}
                </option>
              ))}
            </select>

            {this.state.isDepartmentSelected && (
              <>
                <br />
                <select name="semester" onChange={this.onChange} required>
                  <option value="" disabled selected>
                    Select Semester
                  </option>
                  {this.state.semesters.map((semester) => (
                    <option value={JSON.stringify(semester)}>
                      {semester.title}
                    </option>
                  ))}
                </select>
              </>
            )}
            <br />
            <input
              type="text"
              name="section"
              value={this.state.section}
              placeholder="Section"
              onChange={this.onChange}
              required
            />
            <br />

            <select
              name="institute"
              onChange={this.onChange}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Institute
              </option>
              <option value="Maharaja Surajmal Institute">
                Maharaja Surajmal Institute
              </option>
            </select>
            <br></br>
            <button className="button-secondary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  departments: state.departments,
});

export default connect(mapStateToProps, { registerProfile })(
  withRouter(CreateProfile)
);
