import React, { Component } from "react";
import { getAllUsers } from "../../../actions/dataActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserCard from "../UserCard";
import roles from "../../../config/Roles";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      users: [],
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  static getDerivedStateFromProps(props) {
    return {
      auth: props.auth,
      users: props.users,
    };
  }

  render() {
    const { users, auth } = this.state;

    const students = users.filter((user) => user.role === roles.student);
    const admins = users.filter((user) => user.role === roles.admin);
    const moderators = users.filter((user) => user.role === roles.mod);

    return (
      <div className="dashboard__users">
        <h4 className="dashboard__heading">users</h4>
        <hr className="hr" />

        <div className="users__table">
          <h4 className="dashboard__heading">Students</h4>
          <div className="users__table-body">
            {students.map((user) => (
              <UserCard user={user} key={user._id} />
            ))}
          </div>
        </div>
        <div className="users__table">
          <h4 className="dashboard__heading">Moderators</h4>
          <div className="users__table-body">
            {moderators.map((user) => (
              <UserCard user={user} key={user._id} />
            ))}
          </div>
        </div>

        <div className="users__table">
          <h4 className="dashboard__heading">Admins</h4>
          <div className="users__table-body">
            {admins.map((user) => (
              <UserCard user={user} key={user._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.data.users,
});

export default connect(mapStateToProps, { getAllUsers })(withRouter(Users));
