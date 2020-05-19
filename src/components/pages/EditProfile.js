import React, { Component } from "react";
import { connect } from "react-redux";
import { registerProfile } from "../../actions/dataActions";
// import { getCurrentUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Loader from "../layout/Loader";
import api from "../../config/keys";
import Layout from "../layout/Layout";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      name: "",
      institute: "",
      department: {},
      phone: "",
      enrollment_id: "",
      errors: {},
      semester: {},
      section: "",
      loading: true,
      semesters: [],
      departments: [],
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

    Axios.get(`${api}/profile/`).then((res) => {
      if (res.data) {
        const {
          fullName,
          enrollment_id,
          institute,
          email,
          phone,
          department,
          semester,
          section,
        } = res.data;

        this.setState(
          {
            loading: false,
            name: fullName,
            enrollment_id,
            institute,
            email,
            phone,
            department: JSON.stringify(department),
            semester: JSON.stringify(semester),
            section,
          },
          () => {
            this.getSemesters(department.department_id);
          }
        );
      }
    });
  }

  getSemesters = async (department_id) => {
    try {
      const response = await Axios.get(
        `${api}/department/${department_id}/semesters`
      );
      // console.log(response.data);
      this.setState({ semesters: response.data });
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
      department,
      enrollment_id,
      semester,
      section,
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
      department_id: dep.department_id,
      department_name: dep.department_name,
      institute,
      semester_id: sem.semester_id,
      semester_name: sem.semester_name,
      section,
    };

    Axios.post(`${api}/profile/edit`, data)
      .then((res) => {
        if (res.data) {
          this.props.history.push("/user/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { loading, departments } = this.state;
    if (loading) {
      return <Loader />;
    } else
      return (
        <Layout>
          <div className="form">
            <form onSubmit={this.onSubmit}>
              <h4 className="heading">Edit Profile</h4>
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
              {this.state.errors.enrollment_id &&
                this.state.errors.enrollment_id}
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
                <option value="" disabled>
                  Select Department
                </option>

                {departments.map((department) => (
                  <option
                    selected={
                      JSON.parse(this.state.department).department_name ===
                      department.department_name
                    }
                    value={JSON.stringify(department)}
                  >
                    {department.title}
                  </option>
                ))}
              </select>
              <br />

              <select name="semester" onChange={this.onChange} required>
                <option value="" disabled>
                  Select Semester
                </option>
                {this.state.semesters.map((semester) => (
                  <option
                    selected={
                      JSON.parse(this.state.semester).semster_id ===
                      semester.semester_id
                    }
                    value={JSON.stringify(semester)}
                  >
                    {semester.title}
                  </option>
                ))}
              </select>

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

              <select name="institute" onChange={this.onChange} required>
                <option value="" disabled>
                  Select Institute
                </option>
                <option
                  value="Maharaja Surajmal Institute"
                  selected={
                    this.state.institute === "Maharaja Surajmal Insititute"
                  }
                >
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
  withRouter(EditProfile)
);
