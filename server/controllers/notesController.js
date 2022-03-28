const Notes = require('../modules/Notes.js')

module.exports.newNote = async (req, res) =>{
    const notes = new Notes(req.body)
    await notes.newNote()

    if(notes.errors.length > 0) return res.status(400).json({errors: notes.errors})

    res.status(200).json({message: 'done', note: notes.note})
}

module.exports.updateNote = async (req, res) => {
    const notes = new Notes(req.body)
    await notes.updateNote()
    if(notes.errors.length > 0) return res.status(400).json({errors: notes.errors})
    res.status(200).json('updated')
}

module.exports.deleteNote = async (req, res) => {
    const notes = new Notes(req.body)
    await notes.deleteNote()
    if(notes.errors.length > 0) return res.status(400).json({errors: notes.errors})
    res.status(200).json('deleted')
}