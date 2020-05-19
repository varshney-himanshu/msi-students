import React from "react";
import roles from "../../../config/Roles";
import Box from "./EventsBox";

export default function Events({
  allEvents,
  userEvents,
  deleteEvent,
  auth,
  history,
  approveEvent,
  registeredEvents,
}) {
  const unapprovedEvents = allEvents.filter(
    (event) => event.approved.isApproved !== true
  );

  const approvedEvents = allEvents.filter(
    (event) => event.approved.isApproved === true
  );

  let toDisplayApprovedEvents = <></>;
  if (auth.user.role === roles.admin) {
    toDisplayApprovedEvents = (
      <div className="col col-12 col-md-6">
        <Box
          events={approvedEvents}
          title={"all events (approved)"}
          history={history}
          deleteEvent={deleteEvent}
          showDelete
          showEdit
        />
      </div>
    );
  } else if (auth.user.role === roles.mod) {
    toDisplayApprovedEvents = (
      <div className="col col-12 col-md-6">
        <Box
          events={approvedEvents}
          title={"all events (unapproved)"}
          history={history}
          showEdit={true}
          deleteEvent={deleteEvent}
        />
      </div>
    );
  }

  let toDisplayUnapprovedEvents = <></>;
  if (auth.user.role === roles.admin) {
    toDisplayUnapprovedEvents = (
      <div className="col col-12 col-md-6">
        <Box
          events={unapprovedEvents}
          title={"all events (Unapproved)"}
          history={history}
          deleteEvent={deleteEvent}
          approveEvent={approveEvent}
          showDelete
          showEdit
          showApprove
        />
      </div>
    );
  } else if (auth.user.role === roles.mod) {
    toDisplayUnapprovedEvents = (
      <div className="col col-12 col-md-6">
        <Box
          events={unapprovedEvents}
          title={"all events (unapproved)"}
          history={history}
          approveEvent={approveEvent}
          showEdit
          showApprove
        />
      </div>
    );
  }

  const toDisplayUserEvents = (
    <div className="col col-12 col-md-6">
      <Box
        events={userEvents}
        title={"your events"}
        history={history}
        deleteEvent={deleteEvent}
        showEdit
        showDelete
      />
    </div>
  );

  const toDisplayRegisteredEvents =
    auth.user.role !== roles.admin ? (
      <div className="col col-12 col-md-6">
        <Box
          events={registeredEvents}
          title={"Events you registered"}
          history={history}
        />
      </div>
    ) : (
      <></>
    );

  return (
    <div className="dashboard__events">
      <h4 className="dashboard__heading">Events</h4>
      <hr className="hr" />

      <div className="dashboard__top-buttons">
        <button
          className="button-quad"
          onClick={() => {
            history.push(`/event/create`);
          }}
        >
          add event
        </button>
      </div>

      <div className="row">
        {toDisplayApprovedEvents}
        {toDisplayUnapprovedEvents}
        {toDisplayUserEvents}
        {toDisplayRegisteredEvents}
      </div>
    </div>
  );
}
