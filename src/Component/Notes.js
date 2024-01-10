import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesContext from '../Context/Notes/NotesContext'
import Notesitem from './Notesitem'
import Addnotes from './Addnotes'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

  let navigate = useNavigate();
  const context = useContext(NotesContext)
  const { notes, getNotes, editNotes } = context
  useEffect(() => {
   if(localStorage.getItem('token')){
    getNotes()
   }
   else{
      navigate('/login')
   }
   // eslint-disable-next-line 
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNotes] = useState({ id: ' ', etitle: ' ', edescripation: ' ', etag: ' ' })
  const updateNotes = (Currentnote) => {
    ref.current.click()
    setNotes({ id: Currentnote._id, etitle: Currentnote.title, edescripation: Currentnote.descripation, etag: Currentnote.tag })
  }

  const handleSubmit = (e) => {
    editNotes(note.id, note.etitle, note.edescripation, note.etag)
    refClose.current.click()
    props.showAlert("Updated Successfully", "success")

  }
  const handlenotes = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <>
      <Addnotes  showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handlenotes} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripation" className="form-label">Descripation</label>
                  <input type="text" className="form-control" id="edescripation" name="edescripation" value={note.edescripation} onChange={handlenotes} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handlenotes} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled= {note.etitle.length<5 || note.edescripation.length<5} onClick={handleSubmit} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-4'>
        <h3>Your Notes</h3>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Notesitem key={note._id} updateNotes={updateNotes} note={note}  showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes
