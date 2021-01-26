import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addDataToAPI,
  deleteDataAPI,
  getDataFromAPI,
  updateDataAPI,
} from "../../../config/redux/action";
import "./Dashboard.scss";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: "",
    dialogDelete: false,
    locDataDel: {},
  };

  componentDidMount() {
    // const userData = localStorage.getItem("userData");
    // console.log("data di dashboard!!!!!!", JSON.parse(userData));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.props.getNotes(userData.uid);
    }
  }

  componentDidUpdate() {
    // const asa = "abx4";
    // console.log("localStorage.length", asa.length);
    console.log("loginTimeOut@@@@@@", this.props.loginTimeOut);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    if (textButton === "SIMPAN") {
      if (data.title && data.content) {
        saveNotes(data);
        this.setState({
          title: "",
          content: "",
          textButton: "SIMPAN",
        });
      } else {
        alert("please fill title and content");
      }
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });

    console.log("data", data);
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (note) => {
    console.log("note=======", note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
  };

  deleteNote = (e, note) => {
    // e.stopPropagation();
    // this.handleClickOpen(note);
    // console.log("NOTEEEEEEEEEEEEE", this.state.locDataDel);
    const { deleteNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: this.state.locDataDel.id,
    };
    deleteNotes(data);
    this.handleClose(e);
  };

  handleClickOpen = (e, note) => {
    // console.log("NOTEEEEEEEEEE@@@", note);
    e.stopPropagation();
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
    this.setState({
      dialogDelete: true,
      locDataDel: note,
    });
  };

  handleClose = (e) => {
    e.stopPropagation();
    this.setState({
      dialogDelete: false,
    });
  };

  btnLogout = () => {
    localStorage.removeItem("userData");
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    const { title, content, textButton, dialogDelete } = this.state;
    const { notes } = this.props;
    const {
      handleSaveNotes,
      updateNotes,
      cancelUpdate,
      deleteNote,
      handleClose,
      handleClickOpen,
      btnLogout,
    } = this;
    console.log("notes=====:", notes);
    return (
      <div className="container">
        <div className="input-form">
          <input
            placeholder="title"
            className="input-title"
            value={title}
            onChange={(e) => this.onInputChange(e, "title")}
          />
          <textarea
            placeholder="content"
            className="input-content"
            value={content}
            onChange={(e) => this.onInputChange(e, "content")}
          />
          <div className="action-wrapper">
            {textButton === "UPDATE" ? (
              <button
                className="save-btn cancel"
                onClick={() => cancelUpdate()}
              >
                CANCEL
              </button>
            ) : (
              <div />
            )}

            <button className="save-btn" onClick={() => handleSaveNotes()}>
              {textButton}
            </button>
          </div>
          <button onClick={() => btnLogout()}>Logout</button>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="data">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => handleClickOpen(e, note)}
                  >
                    x
                  </div>
                  <Dialog
                    open={dialogDelete}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      className="alert-dialog"
                      disableTypography
                    >
                      Apakah Anda yakin ingin menghapus data?
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        onClick={(e) => handleClose(e, note)}
                        color="primary"
                      >
                        BATAL
                      </Button>
                      <Button
                        onClick={(e) => deleteNote(e, note)}
                        color="primary"
                        autoFocus
                      >
                        IYA
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              );
            })}
          </Fragment>
        ) : null}
        {/* {setTimeout(() => {
          localStorage.removeItem("userData");
          const { history } = this.props;
          history.push("/Login");
        }, 3600)} */}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
  loginTimeOut: state.loginTimeOut,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNotes: (data) => dispatch(deleteDataAPI(data)),
});
export default connect(reduxState, reduxDispatch)(Dashboard);
