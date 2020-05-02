import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import "./Slider.css";
import { withRouter } from "react-router-dom";

class Slider extends Component {
  static defaultProps = {
    imageFiles: [],
  };

  render() {
    const { imageFiles } = this.props;
    return (
      <div>
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
          {imageFiles.map((file) => (
            <div key={file._id}>
              <img src={file.image.image_url} />
              <p
                onClick={() => {
                  this.props.history.push(`/event/${file.event.event_id}`);
                }}
                className="legend"
              >
                {file.event.event_msg && file.event.event_msg}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default withRouter(Slider);
