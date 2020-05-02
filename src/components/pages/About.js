import React from "react";
import pic1 from "../../profile-pic-placeholder.jpg";
// import "./About.css";
import logo from "../../logo.png";
import Layout from "../layout/Layout";

export default function About() {
  return (
    <Layout>
      <section className="container about">
        <div className="about__info">
          <h1 className="heading">ABOUT US</h1>

          <img className="about__logo" src={logo} alt="" />
          <p className="about__info-paragraph">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            porro, dolore ea eaque cumque perspiciatis. Sapiente aliquid hic,
            voluptates neque debitis veniam incidunt esse quae pariatur ipsa
            temporibus ullam sunt! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Et dolore asperiores vitae modi ducimus. Neque
            quod maxime aliquam laborum, obcaecati alias inventore explicabo
            adipisci nobis porro quisquam perferendis ducimus ipsum Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Minus aspernatur nisi
            est repellendus culpa, libero iusto, eius iure expedita, eum tenetur
            possimus. Quis, debitis iure repellat eveniet laboriosam alias
            praesentium.
          </p>
          <strong className="heading">
            This project is open source, you can contribute to our repositories.
          </strong>
          <div>
            <a
              href="https://www.github.com/varshney-himanshu/msi-event-manager"
              className="repo-link"
            >
              Frontend
            </a>
            <a
              href="https://www.github.com/varshney-himanshu/api-msi-event-manager"
              className="repo-link"
            >
              Backend API
            </a>
          </div>
        </div>

        <div className="about__team">
          <h2 className="heading">MEET OUR TEAM</h2>
          <div className="row">
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="team-card">
                <img className="team-card__pic" src={pic1} alt="" />
                <h4 className="heading team-card__name">Rythm Chaudhary</h4>
                <hr />
                <small className="team-card__role">Mentor</small>
                <br />
                <small className="team-card__info">FACULTY | MSI</small>
              </div>
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="team-card">
                <img className="team-card__pic" src={pic1} alt="" />
                <h4 className="heading team-card__name">Himanshu Varshney</h4>
                <hr />
                <small className="team-card__role">Developer</small>
                <br />
                <small className="team-card__info">STUDENT - BCA | MSI </small>
              </div>
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="team-card">
                <img className="team-card__pic" src={pic1} alt="" />
                <h4 className="heading team-card__name">Amritesh Chandra</h4>
                <hr />
                <small className="team-card__role">Developer</small>
                <br />
                <small className="team-card__info">STUDENT - BCA | MSI</small>
              </div>
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="team-card">
                <img className="team-card__pic" src={pic1} alt="" />
                <h4 className="heading team-card__name">Sidharth Gehlot</h4>
                <hr />
                <small className="team-card__role">Developer</small>
                <br />
                <small className="team-card__info">STUDENT - BCA | MSI</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
