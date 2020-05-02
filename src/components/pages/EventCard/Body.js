import React from "react";
import { extractDateString } from "../../../utils/utils";
import Timer from "../../Timer";

import locationIcon from "../../../assets/icons8-location-96.png";
import dateIcon from "../../../assets/icons8-date-to-52.png";

export default function Body({
  description = "",
  venue = "",
  date = "",
  endDeadline = () => {},
  deadline = "",
  deadlineEnded = true,
}) {
  return (
    <div className="event-card__body">
      <p className="event-card__body__description">
        {description.substring(0, 199)}
        {description.length >= 120 && <strong> ....</strong>}
      </p>
      <hr />
      <div className="event-card__body__venue">
        <img src={locationIcon} />
        {venue}
      </div>
      <div className="event-card__body__date">
        <img src={dateIcon} />
        {extractDateString(date)}
      </div>

      {!deadlineEnded && (
        <Timer endDeadline={endDeadline} deadline={deadline} />
      )}
    </div>
  );
}
