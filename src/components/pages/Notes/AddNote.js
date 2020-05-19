import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import roles from "../../../config/Roles";
import API from "../../../config/keys";
import Dropzone from "react-dropzone";
class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      auth: {},
      departments: [],
      isDepartmentSelected: false,
      semesters: [],
      department: "",
      semester: "",
      isSubjectsLoaded: false,
      subjects: [],
      subject: {},
      file: {},
      description: "",
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const dep_id = this.props.auth.user.department.department_id;
      if (dep_id != undefined) {
        this.getSemesters(dep_id);
      }
    } else {
      this.props.history.push("/login");
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        departments: props.departments,
      };
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

  getSubjects = async (sem_id) => {
    const response = await Axios.get(`${API}/semester/${sem_id}/subjects`);
    this.setState({ subjects: response.data, isSubjectsLoaded: true });
  };

  onChange = (e) => {
    if (e.target.name === "department") {
      const department = JSON.parse(e.target.value);
      this.setState({ [e.target.name]: e.target.value });
      this.getSemesters(department._id);
    } else if (e.target.name === "semester") {
      this.setState({ [e.target.name]: e.target.value });
      const semester = JSON.parse(e.target.value);
      this.getSubjects(semester._id);
    } else if (e.target.name === "file") {
      this.setState({ [e.target.name]: e.target.files[0] });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmitNote = async (e) => {
    e.preventDefault();

    const { user } = this.state.auth;

    const { id, name, department } = user;

    const data = new FormData(); // using FormData to send file to the server

    const user_id = id;
    const user_name = name;

    data.append("user_id", user_id);
    data.append("user_name", user_name);

    let dep = {};

    const sem = JSON.parse(this.state.semester);
    const sub = JSON.parse(this.state.subject);

    console.log(sem);

    if (user.role !== roles.admin) {
      data.append("department_id", department.department_id);
      data.append("department_name", department.department_name);
    } else {
      const depAdmin = JSON.parse(this.state.department);
      data.append("department_id", depAdmin._id);
      data.append("department_name", depAdmin.title);
    }

    data.append("semester_id", sem._id);
    data.append("semester_name", sem.title);
    data.append("subject_id", sub._id);
    data.append("subject_name", sub.title);
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    data.append("file", this.state.file);
    // console.log(data.);
    const response = await Axios.post(`${API}/note/add`, data);
    if (response.data.success) {
      this.props.history.push("/");
    }
  };

  render() {
    const { departments, auth, isSubjectsLoaded } = this.state;
    return (
      <div className="addnote">
        <h1 className="dashboard__heading">add note</h1>
        <hr className="hr" />

        <form className="form" onSubmit={this.onSubmitNote}>
          <input
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.state.title}
            placeholder="Note Title"
          />
          <br />
          {auth.user.role === roles.admin ? (
            <>
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

              <br />
            </>
          ) : (
            <div>
              <small>
                <strong>
                  Department:{" "}
                  {auth.isAuthenticated && auth.user.department.department_name}
                </strong>
              </small>
              <br />
            </div>
          )}
          <select name="semester" onChange={this.onChange} required>
            <option value="" disabled selected>
              Select Semester
            </option>
            {this.state.semesters.map((semester) => (
              <option value={JSON.stringify(semester)}>{semester.title}</option>
            ))}
          </select>
          <br />
          {isSubjectsLoaded && (
            <select name="subject" onChange={this.onChange} required>
              <option value="" disabled selected>
                Select Subject
              </option>
              {this.state.subjects.map((semester) => (
                <option value={JSON.stringify(semester)}>
                  {semester.title}
                </option>
              ))}
            </select>
          )}
          <br />
          <textarea
            name="description"
            className="addnote__description"
            onChange={this.onChange}
            placeholder="Description"
          ></textarea>
          <br />

          <input type="file" name="file" onChange={this.onChange} />
          <br />
          <button className="button-secondary">Add Note</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  departments: state.departments.data,
});

export default connect(mapStateToProps, {})(AddNote);
