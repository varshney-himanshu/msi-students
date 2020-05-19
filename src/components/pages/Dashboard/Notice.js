import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLatestNotice } from "../../../actions/dataActions";
import api from "../../../config/keys";
import Layout from "../../layout/Layout";
class Notice extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    axios
      .post(`${api}/notice/add`, { text })
      .then((res) => {
        if (res.data) {
          this.props.getLatestNotice();
          this.props.history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Layout>
        <div className="dashboard__notice">
          <h4 className="dashboard__heading">Notice</h4>
          <hr className="hr" />
          <div className="form">
            <form onSubmit={this.onSubmit}>
              <textarea
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                placeholder="Add short descriptive notice (Max Words: 250)"
              />
              <button className="button-secondary">Submit</button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(null, { getLatestNotice })(withRouter(Notice));
