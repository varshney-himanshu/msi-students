import React from "react";
import iconDeleteDark from "../../../assets/icons8-delete-bin-24 (1).png";

export default function HomeImages({ images, deleteImage, history }) {
  const imagesDisplay = images.map((Image) => (
    <div className="dashboard__homeimages__body__image">
      <img src={Image.image.image_url}></img>
      <div className="foreground">
        <button onClick={() => deleteImage(Image._id)}>
          delete <img src={iconDeleteDark}></img>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="dashboard__homeimages">
      <h4 className="dashboard__heading">Home Images</h4>
      <hr className="hr" />
      <div className="dashboard__top-buttons">
        <button
          className="button-quad"
          onClick={() => history.push("/dashboard/homeimages/add")}
        >
          add Image
        </button>
      </div>
      <div className="dashboard__homeimages__body">{imagesDisplay}</div>
    </div>
  );
}
