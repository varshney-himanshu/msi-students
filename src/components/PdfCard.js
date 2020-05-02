import React from "react";

export default function PdfCard({ author, title, onDownload = () => {} }) {
  return (
    <div class="pdf-card">
      <div class="pdf-card__side pdf-card__side--front">
        <h1>PDF</h1>
        <small className="pdf-card__title">{title}</small>
        <br></br>
        <small className="pdf-card__author">By {author}</small>
      </div>
      <div class="pdf-card__side pdf-card__side--back">
        <button class="pdf-card__side--back__button" onClick={onDownload}>
          Download
        </button>
      </div>
    </div>
  );
}
