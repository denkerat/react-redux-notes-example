import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import Button from '../components/ui/Button/index';
import { getMoment, convertDate } from '../tools';
import { fetchNotes, saveNote, removeNote, selectDate } from '../actions';
import Note from '../components/Note';

import '../components/ui/styles/ui.css';

class App extends Component {

  componentDidMount = () => this.props.fetchNotes();

  saveNote = value => {
    this.props.saveNote({
      date: this.props.selectedDate,
      text: value
    });
  };
  removeNote = () => this.props.removeNote();
  onCalendarChange = date => {
    this.props.selectDate(convertDate(date));
    this.setState({noteEditMode: false});
  };

  render() {
    const {notes, error, selectedDate} = this.props;

    return (
      <div className="container">
        <h2>Notes Example</h2>
        <hr/>
        <div className="row">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <Calendar onChange={this.onCalendarChange} value={getMoment(selectedDate).toDate()}/>
            <div className="my-2">
              <Button primary onClick={this.props.fetchNotes}>Update</Button>
            </div>
            {error && <span className="text-danger">{error}</span>}
          </div>
          <div className="col-md-6 d-flex flex-column">
            <h4>{getMoment(selectedDate).format('MMMM Do YYYY')}</h4>
            {notes && <Note note={notes[selectedDate]}
                            saveNote={this.saveNote}
                            cancelEditMode={this.cancelEditMode}
                            removeNote={this.removeNote}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({
     notes: {
       pending, error, selectedDate,
       list
     }
   }) => ({
    notes: list, error,
    pending, selectedDate
  }),
  {
    fetchNotes: fetchNotes.request,
    saveNote: saveNote.request,
    removeNote: removeNote.request,
    selectDate
  },
)(App);