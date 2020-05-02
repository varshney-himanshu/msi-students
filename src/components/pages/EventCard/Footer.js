import React from "react";
import roles from "../../../config/Roles";

export default function Footer({
  deadlineEnded,
  event,
  auth,
  isRegistered,
  registerSingle = () => {},
  toggleMultipleRegister,
  history,
}) {
  let registerButton;
  if (event.type === "MULTIPLE") {
    registerButton = (
      <button onClick={toggleMultipleRegister} className="button-secondary">
        Submit Team
      </button>
    );
  } else {
    registerButton = (
      <button className="button-secondary" onClick={registerSingle}>
        Register
      </button>
    );
  }

  return (
    <div className="event-card__footer">
      <button
        className="button-secondary"
        onClick={() => history.push(`/event/${event._id}`)}
      >
        View
      </button>

      {deadlineEnded ? (
        <></>
      ) : (
        <>
          {auth.user.role === roles.student ||
          auth.user.role === roles.mod ||
          auth.isAuthenticated === false ? (
            !isRegistered ? (
              registerButton
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
