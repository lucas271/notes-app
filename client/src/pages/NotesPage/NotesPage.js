import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

import TextField from '@material-ui/core/TextField';
import {ExitToApp, Edit, Delete, ArrowBack} from '@material-ui/icons';

import { logoutAction } from "../../services/actions/userAction";
import { newNoteAction, deleteNoteAction, updateNoteAction } from "../../services/actions/notesAction";

import {v4 as uuid} from 'uuid'

import './styles.css'


const user = JSON.parse(localStorage.getItem('userInfo'))

const NotesPage = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    return <>
        <header className="nav-bar-container">
            <nav className="nav-bar">
                <h1>NOTES APP</h1>
                <TextField size="small" variant='outlined' color="secondary" onChange={(e) => setSearch(e.target.value)} value={search} label='Search Your Note'/>

                <ExitToApp className="logout" onClick={async () => {
                    dispatch(logoutAction())
                    window.location.reload()
                }}/>
            </nav>
        </header>


        <main className="notes-container">
             <AddNewNote/>   
            {user.posts.filter(post => post.title.startsWith(search)).reverse().map(post =>  {
                return <Notes key={post.id} post={post}/>
            })}
        </main>

    </>
}


const AddNewNote = () => {
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [newNoteWindow, setNewNoteWindow] = useState(false)
    const [id, setId] = useState(uuid())
    const [newPosts, setNewPosts] = useState([])

    const dispatch = useDispatch()

    const postNewNote = async (e) => {
        e.preventDefault()

        if(!text || !title) return alert('no empty fields please')

        setId(uuid())

        setNewPosts([{note: {title, text, id}}, ...newPosts])
        dispatch(newNoteAction({user: user}, {note: {title, text, id}}))

        setText('')
        setTitle('')
        setNewNoteWindow(!newNoteWindow)
    }

    return<>
        <section className="note">
            {!newNoteWindow ?
            <button className="new-note-btn" onClick={() => setNewNoteWindow(!newNoteWindow)}>+</button>
            :
            <>
                <form action="/" onSubmit={e => postNewNote(e)} className='edit-form'>
                    <ArrowBack className='back note-btns'  onClick={(() => setNewNoteWindow(!newNoteWindow))}/>
                    <TextField onChange={(e) => setTitle(e.target.value)} value={title} label='Title'/>
                    <TextField
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    multiline
                    minRows={3}
                    maxRows={5}
                    label='type your text Here'
                    className="text"
                    variant='filled'
                    />
                    <button type="send" className="send-btn">Send</button>
                </form>
            </>
            }
        </section>
        {newPosts.map(post => {
            return <Notes key={post.note.id} post={post.note}/>
        })}
    </>

}



const Notes = ({post}) => {
    const [editWindow, setEditWindow] = useState(false)
    const [note, setNote] = useState(post)


    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const updateNote = (e) => {
        console.log(e.target)
        setNote({...note, text, title})
        setEditWindow(!editWindow)
        e.preventDefault()
        dispatch(updateNoteAction({user: user}, {updateNote: {id: note.id, text, title}}))
    }

    return <>
        <section className='note'>


            {!editWindow
            ? 
            <>  
                <div className="note-btns">
                    <DeleteNote post={note}/>
                    <Edit className="edit" onClick={() => setEditWindow(!editWindow)}/>
                </div>


                <h2>{note.title}</h2>
                <p>{note.text}</p>
                
            </> 
            : 
            <>
                <form action="/" onSubmit={e => updateNote(e)} className='edit-form'>
                    <ArrowBack className='back note-btns'  onClick={(() => setEditWindow(!editWindow))}/>
                    <TextField onChange={(e) => setTitle(e.target.value)} value={title} label='Title'/>
                    <TextField
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    multiline
                    minRows={3}
                    maxRows={5}
                    label='type your text Here'
                    className="text"
                    variant='filled'
                    />
                    <button type="send" className="send-btn">Send</button>
                </form>
            </> }
        </section>
    </>
}


const DeleteNote = ({post, }) => {
    const dispatch = useDispatch()

    const deleteNoteFromDom= (e) => {
        e.preventDefault()

        //better aproach would be to use useRef here
        if(!e.target.parentElement.parentElement.classList.contains('note')){
            e.target.parentElement.parentElement.parentElement.classList.add("remove-note")

            e.target.parentElement.parentElement.parentElement.addEventListener("animationend", () => {
                e.target.parentElement.parentElement.parentElement.remove()

            })

        }
        if(!e.target.parentElement.parentElement.parentElement.classList.contains('note')){
            e.target.parentElement.parentElement.classList.add("remove-note")

            e.target.parentElement.parentElement.addEventListener("animationend", () => {
                e.target.parentElement.parentElement.remove()
            })
        }
    
        deleteNoteFromDB()

    }

    const deleteNoteFromDB = () => {
        dispatch(deleteNoteAction({user: user}, {deleteNote: {id: post.id}}))
    }



    
    return <>
        <Delete className="delete" onClick={(e) => deleteNoteFromDom(e)}/>
    </>
}

export default NotesPage