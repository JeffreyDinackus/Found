const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notesDB', { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

// Existing GET route to fetch all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Existing POST route to save a new note
app.post('/api/notes', async (req, res) => {
  const { content } = req.body;
  try {
    const newNote = new Note({ content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// New DELETE route to delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).send('Note not found');
    }

    res.json(deletedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
