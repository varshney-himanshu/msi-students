import React from "react";
import iconDeleteWhite from "../../../assets/icons8-delete-bin-24.png";
import iconEditWhite from "../../../assets/icons8-edit-24.png";
import iconViewWhite from "../../../assets/icons8-eye-24.png";
import iconApproveWhite from "../../../assets/icons8-approval-24.png";

export default function NotesBox({
  title,
  notes = [],
  deleteNote = () => {},
  approveNote = () => {},
  showDelete = false,
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
          {notes.map((note, i) => (
            <li key={note._id}>
              <div
                className={`dashboard__right-section__box__list__el dashboard__right-section__box__list__el--${
                  note.approved.isApproved ? "approved" : "unapproved"
                }`}
              >
                {i +
                  1 +
                  " | " +
                  note.title.substring(0, 50) +
                  " | " +
                  note.department.department_name +
                  " | " +
                  note.semester.semester_name}
                <div className="dashboard__right-section__box__list__el__buttons">
                  <button
                    className="button button--view"
                    onClick={() => {
                      window.open(note.file.file_url);
                    }}
                  >
                    <img src={iconViewWhite} title="View"></img>
                  </button>

                  {showDelete && (
                    <button
                      className="button button--delete"
                      onClick={() => {
                        deleteNote(note._id);
                      }}
                    >
                      <img src={iconDeleteWhite} title="Delete"></img>
                    </button>
                  )}

                  {showApprove && (
                    <button
                      className="button button--approve"
                      onClick={() => {
                        approveNote(note._id);
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
