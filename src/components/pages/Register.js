import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router";
import logo from "../../logo.png";
import roles from "../../config/Roles";
import Layout from "../layout/Layout";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      department: "",
      departments: [],
      errors: {},
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.err) {
      return {
        errors: props.err,
        departments: props.departments.data,
      };
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, name, password, password2, department } = this.state;
    const role = roles.student;
    const dep = JSON.parse(department);

    const data = {
      name,
      email,
      password,
      password2,
      role,
      department_id: dep._id,
      department_name: dep.title,
    };

    this.props.registerUser(data, this.props.history);
  };

  render() {
    const { departments } = this.state;
    return (
      <Layout>
        <div className="register-page">
          <div className="form">
            <br />
            <form onSubmit={this.onSubmit}>
              <img
                className="login-logo"
                rel="preload"
                src={logo}
                alt="MSI Logo"
              />
              <h4 className="heading">MSI Events - Register</h4>
              <input
                type="text"
                name="name"
                value={this.state.name}
                placeholder="Username"
                onChange={this.onChange}
              />
              {this.state.errors.name && this.state.errors.name}
              <input
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Email Address"
                onChange={this.onChange}
              />
              {this.state.errors.email && this.state.errors.email}
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
              />
              {this.state.errors.password && this.state.errors.password}
              <br />
              <input
                type="password"
                name="password2"
                placeholder="Confim Password"
                onChange={this.onChange}
              />
              {this.state.errors.password2 && this.state.errors.password2}
              <br />
              <select name="department" onChange={this.onChange} required>
                <option value="" disabled selected>
                  Select Department
                </option>

                {departments.map((department) => (
                  <option value={JSON.stringify(department)}>
                    {department.title}
                  </option>
                ))}
              </select>
              <button type="submit" value="Register">
                Register
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  err: state.errors,
  departments: state.departments,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
