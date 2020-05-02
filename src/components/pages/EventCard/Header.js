import React from "react";

function Header({ deadlineEnded = false, heading = "", isRegistered = false }) {
  return (
    <div className="event-card__header">
      <h2 className="heading-secondary">{heading}</h2>
      {deadlineEnded ? (
        <div className="event-card__header__registration-closed">
          <small>Registration Closed</small>
        </div>
      ) : isRegistered ? (
        <div className="event-card__header__registered">
          <small>Registered</small>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Header;
