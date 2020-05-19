import React from "react";
import iconDeleteWhite from "../../../assets/icons8-delete-bin-24.png";
import iconEditWhite from "../../../assets/icons8-edit-24.png";
import iconViewWhite from "../../../assets/icons8-eye-24.png";
import iconApproveWhite from "../../../assets/icons8-approval-24.png";

export default function Box({
  title,
  events,
  deleteEvent = () => {},
  approveEvent = () => {},
  showDelete = false,
  showEdit = false,
  showApprove = false,
  history,
}) {
  return (
    <div className="dashboard__right-section__box">
      <div className="dashboard__right-section__box__header">
        <span>{title}</span>
      </div>
      <div className="dashboard__right-section__box__body">
        <ul className="dashboard__right-section__box__list">
          {events.map((event, i) => (
            <li key={event._id}>
              <div
                className={`dashboard__right-section__box__list__el dashboard__right-section__box__list__el--${
                  event.approved.isApproved ? "approved" : "unapproved"
                }`}
              >
                {i + 1 + " | " + event.title.substring(0, 50)}
                <div className="dashboard__right-section__box__list__el__buttons">
                  <button
                    className="button button--view"
                    onClick={() => {
                      history.push(`/event/${event._id}`);
                    }}
                  >
                    <img src={iconViewWhite} title="View"></img>
                  </button>

                  {showDelete && (
                    <button
                      className="button button--delete"
                      onClick={() => {
                        deleteEvent(event._id);
                      }}
                    >
                      <img src={iconDeleteWhite} title="Delete"></img>
                    </button>
                  )}
                  {showEdit && (
                    <button
                      className="button button--edit"
                      onClick={() => {
                        history.push(`/event/edit/${event._id}`);
                      }}
                    >
                      <img src={iconEditWhite} title="Edit"></img>
                    </button>
                  )}
                  {showApprove && (
                    <button
                      className="button button--approve"
                      onClick={() => {
                        approveEvent(event._id);
                      }}
                    >
                      <img src={iconApproveWhite} title="Approve"></img>
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
