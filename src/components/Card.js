import React from "react";

export default function Card({ details, title, onClick = () => {} }) {
  return (
    <div class="card" onClick={onClick}>
      <div class="card__title">{title}</div>
      <div class="card__details">
        <small>{details}</small>
      </div>
    </div>
  );
}
