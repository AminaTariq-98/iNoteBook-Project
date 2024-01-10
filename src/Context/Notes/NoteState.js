import React, { useState } from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {

  const host = "http://localhost:4000"

  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)


  //get notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });

    const json = await response.json()
    console.log(json)
    setNotes(json)
  }


   // Add a Note
  const addNotes = async (title, descripation, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, descripation, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }


  //delete notes
  const deleteNotes = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json)

    console.log("Notes are deleted" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //edit notes
  const editNotes = async (id, title, descripation, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, descripation, tag}),
    });
    const json = await response.json();
    console.log(json)
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].descripation = descripation;
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NotesContext.Provider value={{ notes, getNotes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}
export default NoteState;




