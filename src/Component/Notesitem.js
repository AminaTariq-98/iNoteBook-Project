import React , {useContext }  from 'react'
import NotesContext from '../Context/Notes/NotesContext'

const Notesitem = (props) => {
    
    const context = useContext(NotesContext)
    const {deleteNotes} = context
    const { note, updateNotes } = props;

    const istyle={
        cursor: 'pointer'
    }


    return (
        <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNotes(note._id) ; props.showAlert("Deleted Successfully", "success")}} style={istyle}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{updateNotes(note)}} style={istyle}></i>
                </div>
                <p className="card-text">{note.descripation}</p>

            </div>
        </div>
    </div>
    )
}

export default Notesitem
