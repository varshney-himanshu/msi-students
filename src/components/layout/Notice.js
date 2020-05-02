import React, { Component } from "react";
// import "./Notice.css";

class Notice extends Component {
  static defaultProps = {
    text: "There is currently no notice!",
  };

  render() {
    return (
      <div className="notice">
        <div className="notice__header">NOTICE</div>
        <p className="notice__text">{this.props.text}</p>
      </div>
    );
  }
}

export default Notice;
