import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default function Layout(props) {
  return (
    <ReactCSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={200}
      transitionName={"SlideIn"}
    >
      {props.children}
    </ReactCSSTransitionGroup>
  );
}
