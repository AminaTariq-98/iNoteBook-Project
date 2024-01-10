import React, { useState, useContext } from 'react'
import NotesContext from '../Context/Notes/NotesContext'

const Addnotes = (props) => {

    const context = useContext(NotesContext)
    const { addNotes } = context

    const [note, setNotes] = useState({ title: ' ', descripation: ' ', tag: ' '})
    const handleSubmit = (e) => {
        e.preventDefault();
        addNotes(note.title, note.descripation, note.tag);
        setNotes({title: "", descripation: "", tag: ""})
        props.showAlert("Notes Added Successfully", "success")
    }

    const handlenotes = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <div className='container my-5'>
            <h2>Add Notes</h2>
            <form className='my-2'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        onChange={handlenotes}
                        value={note.title}
                        minLength={5} required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripation" className="form-label">Descripation</label>
                    <input type="text"
                        className="form-control"
                        id="descripation"
                        name='descripation'
                        onChange={handlenotes}
                        value={note.descripation}
                        minLength={5} required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripation" className="form-label">Tag</label>
                    <input type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        value={note.tag}
                        onChange={handlenotes}
                    />
                </div>
                <button disabled= {note.title.length<5 || note.descripation.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Notes</button>
            </form>
        </div>
    )
}

export default Addnotes
