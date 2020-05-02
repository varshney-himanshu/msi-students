import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../config/keys";
import axios from "axios";
import Layout from "../../layout/Layout";
import Loader from "../../layout/Loader";
import Card from "../../Card";
import PdfCard from "../../PdfCard";
import FileDownload from "js-file-download";

class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: {},
      notes: [],
      isSubjectsLoaded: false,
    };
  }

  async componentDidMount() {
    const sub_id = this.props.match.params.subject;
    console.log(sub_id);
    const response = await axios.get(`${api}/note/subject/${sub_id}/approved`);
    this.setState({ notes: response.data, isSubjectsLoaded: true });
  }

  static getDerivedStateFromProps(props) {
    if (props.auth) {
      return {
        auth: props.auth,
        departments: props.departments,
      };
    }
  }

  downloadFile = (file_link, file_name) => {
    // FileDownload(file_link, file_name + ".pdf");
    window.open(file_link);
  };

  render() {
    const { isSubjectsLoaded, notes } = this.state;
    if (!isSubjectsLoaded) {
      return <Loader />;
    } else {
      return (
        <Layout>
          <div className="departments">
            <h1 className="heading-primary">{notes[0].subject.subject_name}</h1>
            <hr className="hr" />
            <div className="container">
              <div className="row">
                {notes.map((note) => (
                  <div className="col col-6 col-md-2">
                    {note.file.file_type.split("/")[1] === "pdf" ? (
                      <PdfCard
                        title={note.title}
                        author={note.user.user_name}
                        onDownload={() => {
                          this.downloadFile(note.file.file_url, note.title);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  departments: state.departments.data,
});

export default connect(mapStateToProps, {})(Subject);
