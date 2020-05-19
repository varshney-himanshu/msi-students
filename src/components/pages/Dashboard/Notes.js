import React from "react";
import NotesBox from "./NotesBox";
import roles from "../../../config/Roles";

export default function Notes({
  allnotes = [],
  userNotes = [],
  deleteNote = () => {},
  approveNote = () => {},
  auth = {},
  history,
}) {
  let unapprovedNotes = [];
  let approvedNotes = [];

  unapprovedNotes = allnotes.filter(
    (note) => note.approved.isApproved !== true
  );

  approvedNotes = allnotes.filter((note) => note.approved.isApproved === true);

  let toDisplayApprovedNotes = <></>;
  let toDisplayUnapprovedNotes = <></>;
  let toDisplayUserNotes = (
    <div className="col col-12 col-md-6">
      <NotesBox
        title="Your notes"
        notes={userNotes}
        deleteNote={deleteNote}
        showDelete
      />
    </div>
  );

  if (auth.user.role === roles.admin) {
    unapprovedNotes = allnotes.filter(
      (note) => note.approved.isApproved !== true
    );

    approvedNotes = allnotes.filter(
      (note) => note.approved.isApproved === true
    );

    toDisplayApprovedNotes = (
      <div className="col col-12 col-md-6">
        <NotesBox
          title="all notes (approved)"
          notes={approvedNotes}
          deleteNote={deleteNote}
          showDelete
        />
      </div>
    );

    toDisplayUnapprovedNotes = (
      <div className="col col-12 col-md-6">
        <NotesBox
          title="all notes (unapproved)"
          notes={unapprovedNotes}
          deleteNote={deleteNote}
          approveNote={approveNote}
          showApprove
          showDelete
        />
      </div>
    );
  } else if (auth.user.role === roles.mod) {
    unapprovedNotes = allnotes.filter(
      (note) =>
        note.approved.isApproved !== true &&
        auth.user.department.department_id === note.department.department_id
    );

    approvedNotes = allnotes.filter(
      (note) =>
        note.approved.isApproved === true &&
        auth.user.department.department_id === note.department.department_id
    );

    toDisplayApprovedNotes = (
      <div className="col col-12 col-md-6">
        <NotesBox title="all notes (approved)" notes={approvedNotes} />
      </div>
    );

    toDisplayUnapprovedNotes = (
      <div className="col col-12 col-md-6">
        <NotesBox
          title="all notes (unapproved)"
          notes={unapprovedNotes}
          approveNote={approveNote}
          showApprove
        />
      </div>
    );
  }

  return (
    <div className="dashboard__notes">
      <h4 className="dashboard__heading">notes</h4>
      <hr className="hr" />

      <div className="dashboard__top-buttons">
        <button
          className="button-quad"
          onClick={() => {
            history.push("/notes/add");
          }}
        >
          add note
        </button>
      </div>

      <div className="row">
        {toDisplayApprovedNotes}
        {toDisplayUnapprovedNotes}
        {toDisplayUserNotes}
      </div>
    </div>
  );
}
