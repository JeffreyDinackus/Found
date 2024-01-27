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

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
