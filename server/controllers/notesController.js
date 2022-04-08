const Notes = require('../modules/Notes.js')

module.exports.newNote = async (req, res) =>{
    try {
        const notes = new Notes(req.body)
        await notes.newNote()
    
        if(notes.errors.length > 0) return res.status(400).json({errors: notes.errors})
    
        res.status(200).json({message: 'created successfuly', note: notes.note})
    } catch (error) {
        res.status(500).json({errors: ['server error']})

    }

}

module.exports.updateNote = async (req, res) => {
    try {
        const notes = new Notes(req.body)
        await notes.updateNote()
    
        console.log(notes.errors)
        if(notes.errors.length > 0) return res.status(400).json({errors: notes.errors})
        res.status(200).json('updated successfuly')
        
    } catch (error) {
        res.status(500).json({errors: ['server error']})
    }

}

module.exports.deleteNote = async (req, res) => {
    try {
        const notes = new Notes(req.body)
        await notes.deleteNote()
        if(notes.errors.length > 0) return res.status(400).json({errors: notes.errors})
        res.status(200).json('deleted succesfuly')
    } catch (error) {
        res.status(500).json({errors: ['server error']})
    }

}