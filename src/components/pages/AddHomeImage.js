import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { getHomeImages } from "../../actions/dataActions";
import { connect } from "react-redux";
import api from "../../config/keys";
import Layout from "../layout/Layout";

class AddHomeImage extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      msg: "",
    };
  }

  onChangeInput = (e) => {
    switch (e.target.name) {
      case "image":
        this.setState({ image: e.target.files[0] });
        break;

      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onUpload = (e) => {
    e.preventDefault();

    const { image, id, msg } = this.state;
    let data = new FormData();

    const event = {
      event_id: id,
      event_msg: msg,
    };

    data.append("file", image);
    data.append("event", JSON.stringify(event));

    axios //https://api-msi-event-manager.now.sh/image/home/add
      .post(`${api}/image/home/add`, data)
      .then((res) => {
        if (res.data) {
          this.props.getHomeImages();
          this.props.history.push("/dashboard");
        }
      });
  };

  render() {
    return (
      <Layout>
        <div className="addhomeimage">
          <h4 className="dashboard__heading">Add Image</h4>
          <hr className="hr" />
          <div className="form">
            <form onSubmit={this.onUpload}>
              <input
                type="text"
                name="id"
                onChange={this.onChangeInput}
                placeholder="Event ID"
              />
              <br />
              <input
                type="text"
                name="msg"
                onChange={this.onChangeInput}
                placeholder="A short message for the event"
              />
              <br />
              <input type="file" name="image" onChange={this.onChangeInput} />
              <button className="button-secondary">Upload</button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(null, { getHomeImages })(withRouter(AddHomeImage));
