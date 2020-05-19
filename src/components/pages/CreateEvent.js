import React, { Component } from "react";
import { connect } from "react-redux";
import { registerEvent } from "../../actions/dataActions";
import Layout from "../layout/Layout";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      venue: "",
      deadline: "",
      description: "",
      date: "",
      type: "SINGLE",
      errors: {},
      auth: {},
      dateNow: "",
      img: null,
      members: null,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        errors: props.errors,
      };
    }
  }

  componentDidMount() {
    const dateNow = new Date();
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    const d = `${year}-${month}-${date}`;
    this.setState({ dateNow: d });
  }

  onChange = (e) => {
    switch (e.target.name) {
      case "img":
        this.setState({ img: e.target.files[0] });
        break;

      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { id, name } = this.state.auth.user;
    const {
      date,
      title,
      venue,
      description,
      deadline,
      img,
      type,
      members,
    } = this.state;

    const data = new FormData(); // using FormData to send file to the server
    data.append("creator_id", id);
    data.append("creator_name", name);
    data.append("title", title);
    data.append("venue", venue);
    data.append("description", description);
    data.append("file", img);
    data.append("deadline", deadline);
    data.append("date", date);
    data.append("type", type);

    if (type === "MULTIPLE") {
      data.append("members", members);
    } else {
      data.append("members", 1);
    }

    this.props.registerEvent(data, this.props.history);
  };

  render() {
    const { dateNow, type } = this.state;
    return (
      <Layout>
        <div className="create-event">
          <h4 className="dashboard__heading">Add Event</h4>
          <hr className="hr" />
          <form className="form" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={this.state.title}
              onChange={this.onChange}
            />
            <br />
            <textarea
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.onChange}
            />
            <br />
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={this.state.venue}
              onChange={this.onChange}
            />
            <br />
            <label>Date </label>
            <br />
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.onChange}
              min={dateNow}
            />
            <br />
            <label>Type Of Event</label>
            <div className="form__radio">
              <input
                className="radio"
                type="radio"
                name="type"
                value="SINGLE"
                onChange={this.onChange}
                required
              />

              <span>Single</span>
              <input
                className="radio"
                type="radio"
                name="type"
                value="MULTIPLE"
                onChange={this.onChange}
                required
              />

              <span>Team</span>
            </div>
            {type === "MULTIPLE" ? (
              <>
                <label>Number Of Members In A Team: </label>
                <input
                  placeholder="Min: 2, Max: 5"
                  name="members"
                  type="number"
                  min={2}
                  max={5}
                  onChange={this.onChange}
                  required
                />
              </>
            ) : (
              <></>
            )}
            <label>Deadline </label>
            <input
              type="date"
              name="deadline"
              value={this.state.deadline}
              onChange={this.onChange}
              min={dateNow}
            />
            <input
              onChange={this.onChange}
              type="file"
              name="img"
              placeholder="upload image for the event"
              required
            />
            <button className="button-secondary">Submit</button>
          </form>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerEvent })(CreateEvent);
