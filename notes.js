const fs = require('fs')
const chalk = require("chalk");
const addNote =  (title, body)=> {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( note=> note.title === title)
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote=(title)=>{
  const notes = loadNotes()
  const newNote= notes.filter(note=>note.title!==title)
  if(newNote){
    console.log(chalk.green.inverse("note with the title "+ title +" is removed!"))
  }
  else {
    console.log(chalk.red.inverse("no note with this title found"))
  }
  saveNotes(newNote)

}
const listNotes=()=>{
  const notes=loadNotes()
  console.log(chalk.white.inverse("Your notes:"))
  notes.forEach(note=>console.log(chalk.blue.inverse(note.title)))
}

const readNote=(title)=>{
  const notes=loadNotes()
  const wanted=notes.find(note=>note.title===title)
  if(!wanted)
    console.log(chalk.red.inverse("Can't read note with this title"))
  else {
    console.log(chalk.green.inverse("The title is: "+ wanted.title)) 
    console.log(chalk.green.inverse("The body is: "+ wanted.body)) 

  }
}
const saveNotes =(notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
  readNote:readNote,
  listNotes:listNotes,
  removeNote:removeNote,
    addNote: addNote
}