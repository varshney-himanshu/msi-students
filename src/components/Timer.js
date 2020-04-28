import React from "react";
import "./Timer.css";

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

class Timer extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  static defaultProps = {
    endDeadline: () => {}
  };

  componentDidMount() {
    if (this.props.deadline) {
      this.interval = setInterval(() => {
        var deadline = new Date(this.props.deadline);
        var now = new Date();
        var rt = deadline - now;
        var days = Math.floor(rt / (1000 * 60 * 60 * 24));
        var hours = Math.floor((rt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((rt % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((rt % (1000 * 60)) / 1000);

        this.setState({ days, hours, minutes, seconds });
        if (rt <= 0) {
          this.setState({ initialState });
          clearInterval(this.interval);
          this.props.endDeadline();
        }
      }, 1000);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className="timer">
        <span>
          {days < 10 && "0"}
          {days}
          <small className="time-info">D</small>
        </span>{" "}
        <span>
          {hours < 10 && "0"}
          {hours}
          <small className="time-info">H</small>
        </span>{" "}
        <span>
          {minutes < 10 && "0"}
          {minutes}
          <small className="time-info">M</small>
        </span>{" "}
        <span>
          {seconds < 10 && "0"}
          {seconds}
          <small className="time-info">S</small>
        </span>
      </div>
    );
  }
}

export default Timer;
