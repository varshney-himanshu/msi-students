import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllUsers } from "../../actions/dataActions";
// import "./UserCard.css";
import Axios from "axios";
import api from "../../config/keys";
import roles from "../../config/Roles";

class UserCard extends Component {
  constructor() {
    super();
    this.state = {
      role: "",
      isPasswordVerfied: false,
      password: "",
    };
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({ role: user.role });
  }

  onClickToggle = () => {
    const id = "#" + "form-" + this.props.user._id.toString();
    const form = document.querySelector(id);
    form.classList.toggle("users__card-show-form");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickVerify = (e) => {
    e.preventDefault();

    const { password } = this.state;

    Axios.post(`${api}/user/verify-password`, {
      password,
    }).then((res) => {
      if (res.data) {
        this.setState({ isPasswordVerfied: res.data });
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props;
    const { role } = this.state;

    Axios.put(`${api}/user/${user._id}/update-role`, { role })
      .then((res) => {
        if (res.data) {
          this.onClickClose();
          this.props.getAllUsers();
        }
      })
      .catch((err) => console.log(err));
  };

  onClickClose = () => {
    const id = "#" + "form-" + this.props.user._id.toString();
    const form = document.querySelector(id);
    form.classList.remove("users__card-show-form");
  };

  onClickDelete = () => {
    const { _id } = this.props.user;
    if (window.confirm("Are you sure you want to delete this user?")) {
      Axios.delete(`${api}/user/${_id}`).then((res) => {
        if (res.data) {
          this.props.getAllUsers();
          window.alert("deleted");
        }
      });
    }
  };

  render() {
    const { user } = this.props;
    const { isPasswordVerfied } = this.state;
    return (
      <div className="users__card">
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
            <span className="key">Username: </span> {user.name}
          </div>
          <div className="col col-12 col-sm-6 col-md-4 col-lg-4">
            <span className="key">Email:</span> {user.email}
          </div>
          <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
            <span className="key">Role:</span> {user.role}
          </div>
          <div className="col col-12 col-sm-6 col-md-4 col-lg-2 card_btns">
            <button className="button-dark" onClick={this.onClickToggle}>
              Change Role
            </button>
            <button
              onClick={this.onClickDelete}
              title="Delete User"
              className="button-dark-outline"
            >
              x
            </button>
            <form id={"form-" + user._id.toString()} onSubmit={this.onSubmit}>
              <button
                className="form-close"
                type="button"
                onClick={this.onClickClose}
                title="close"
              >
                x
              </button>
              <select
                name="role"
                defaultValue={user.role}
                onChange={this.onChange}
              >
                <option
                  value={roles.student}
                  selected={user.role === roles.student}
                >
                  STUDENT
                </option>
                <option value={roles.mod} selected={user.role === roles.mod}>
                  MODERATOR
                </option>
                <option
                  value={roles.admin}
                  selected={user.role === roles.admin}
                >
                  ADMIN
                </option>
              </select>

              {!isPasswordVerfied ? (
                <>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Verify Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <button
                    type="button"
                    onClick={this.onClickVerify}
                    className="button-dark"
                  >
                    Verify
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="button-dark">
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getAllUsers })(withRouter(UserCard));
