const mongoose = require('mongoose')
const UserModel = mongoose.model('users')
const uuid = require('uuid')


class Notes{
    constructor(body){
        this.body = body
        this.errors = []
        this.note = null
    }

    async newNote(){
        try {
            if(!this.body.note.title || !this.body.note.text) return this.errors.push('empty fields')
            if (this.errors.length > 0) return


            this.note = {title: this.body.note.title, text: this.body.note.text, id:uuid.v4()}

            await UserModel.updateOne({email: this.body.user.email}, {$push: {notes: this.note}})

            
        } catch (error) {
            this.errors.push('could not create note error: '+ error)
        }

    }
    async updateNote(){

        if(!this.body.updateNote.title || !this.body.updateNote.text) return this.errors.push('empty fields')

        const user =  await UserModel.findOne({email: this.body.user.email})
        const notes = user.notes

        const noteToBeUpdated = notes.find(note => note.id === this.body.updateNote.id)
        if(!noteToBeUpdated) return this.errors.push('could not find note')

        //updateNotesObj
        notes[notes.indexOf(noteToBeUpdated)] = {
            id: noteToBeUpdated.id,
            text: this.body.updateNote.text,
            title: this.body.updateNote.title
        }

        await UserModel.updateOne({email:this.body.user.email}, {notes: notes})

    }

    async deleteNote(){
        const user =  await UserModel.findOne({email: this.body.user.email})
        const notes = user.notes

        const noteToBeDeleted = notes.find(note => note.id === this.body.deleteNote.id)
        if(!noteToBeDeleted) return this.errors.push('could not find note')

        //delete note
        await UserModel.updateOne({email:this.body.user.email}, {            
            $pull: {
                notes: noteToBeDeleted
            }
        })
    }

}

module.exports = Notes