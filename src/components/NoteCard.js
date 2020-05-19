import React from "react";

export default function NoteCard({
  type,
  author,
  title,
  onDownload = () => {},
}) {
  let type_display = "";
  if (type.toLowerCase() === "pdf") {
    type_display = type;
  } else if (type.includes("doc")) {
    type_display = "doc";
  } else {
    type_display = "Other";
  }

  return (
    <div class={`note-card note-card--${type_display}`}>
      <div class={"note-card__side note-card__side--front"}>
        <div className="note-card__type">
          <h1>{type_display}</h1>
        </div>
        <small className="note-card__title">{title}</small>
        <br></br>
        <small className="note-card__author">By {author}</small>
      </div>
      <div class="note-card__side note-card__side--back">
        <button class="note-card__side--back__button" onClick={onDownload}>
          Download
        </button>
      </div>
    </div>
  );
}
