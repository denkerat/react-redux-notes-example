import React, { Component, Fragment } from "react";
import Button from '../components/ui/Button/index';

class Note extends Component {
  state = {
    noteEditValue: '',
    noteEditMode: false
  };

  onTextEditChange = e => this.setState({noteEditValue: e.target.value});
  cancelEditMode = () => this.setState({noteEditMode: false, noteEditValue: ''});

  render() {
    const {note, saveNote, removeNote} = this.props;
    const {noteEditMode, noteEditValue} = this.state;
    return (
      <div className="d-flex flex-column align-items-start">
        {note ? (
          !this.state.noteEditMode && (
            <Fragment>
              <span className="p-3">{note.text}</span>
              <div className="mt-2">
                <Button primary icon="edit" className="mx-1"
                        onClick={() => this.setState({
                          noteEditMode: true,
                          noteEditValue: note.text
                        })}>
                  Edit
                </Button>
                <Button danger icon="remove" className="mx-1" onClick={removeNote}>
                  Remove
                </Button>
              </div>
            </Fragment>
          )
        ) : !noteEditMode && (
          <Button primary icon="plus"
                  onClick={() => this.setState({noteEditMode: true})}>
            Add
          </Button>
        )}
        {noteEditMode && (
          <div className="d-flex flex-column align-items-start">
          <textarea className="form-control w-100"
                    value={noteEditValue}
                    onChange={this.onTextEditChange}/>
            <div className="mt-3">
              <Button primary onClick={() => {
                saveNote(noteEditValue);
                this.setState({noteEditMode: false, noteEditValue: ''});
              }}>OK</Button>
              <Button onClick={this.cancelEditMode}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Note;