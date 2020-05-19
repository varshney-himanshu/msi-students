import React from "react";
import Loader from "../../layout/Loader";

const Profile = ({ profile = {}, loading, user, history = {} }) => {
  return (
    <div className="dashboard__profile">
      {!user.isProfileCreated ? (
        <div className="create-profile">
          <p>
            You need to create a profile to participate in events. Your profile
            data is sent when you register on an event.
          </p>
          <button
            className="button-secondary"
            onClick={() => history.push("/user/profile/create")}
          >
            Create Profile
          </button>
        </div>
      ) : !loading ? (
        <>
          <div className="dashboard__profile__header">
            <div className="profile-picture"></div>
            <div className="username">
              {user.name}
              <span className="edit-profile">
                <button
                  onClick={() => {
                    history.push("profile/edit");
                  }}
                >
                  <i className="far fa-edit"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="dashboard__profile__body">
            <div>
              <span className="field">Name - </span>
              <span className="value">{profile.fullName}</span>
            </div>
            <div>
              <span className="field">Email - </span>
              <span className="value">{user.email}</span>
            </div>

            <div>
              <span className="field">Phone - </span>
              <span className="value">{profile.phone}</span>
            </div>
            <div>
              <span className="field">Enrollment ID - </span>
              <span className="value"> {profile.enrollment_id}</span>
            </div>
            <div>
              <span className="field">Course - </span>
              <span className="value">
                {profile.department.department_name}
              </span>
              <span className="field">Semester - </span>
              <span className="value">
                {profile.semester.semester_name.split(" ")[1]}{" "}
              </span>
              <span className="field">Section - </span>
              <span className="value">{profile.section} </span>
            </div>
            <div>
              <span className="field">Institute - </span>
              <span className="value">{profile.institute}</span>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Profile;
