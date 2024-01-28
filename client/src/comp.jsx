import { useState, useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './App.css'

const ConditionalElement = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [textValue, setTextValue] = useState('');
  const downloadLinkRef = useRef(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleTextAreaChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setTextValue(content);
      };

      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const allNotesContent = notes.map((note) => note.content).join('\n');
    const blob = new Blob([allNotesContent], { type: 'text/plain' });
    const downloadLink = downloadLinkRef.current;

    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'allNotes.txt';
    downloadLink.click();
  };

  const saveNoteToMongoDB = async () => {
    try {
      await axios.post('http://localhost:5000/api/notes', { content: textValue });
      // Refresh the notes after saving
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNoteFromMongoDB = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      // Refresh the notes after deleting
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, authenticated user!</p>
          <button className='start-button' onClick={handleDownload}>Download Text</button>
          <input type="file" className='start-button' accept=".txt" onChange={handleFileChange} />
          <button className='start-button' onClick={saveNoteToMongoDB}>Save Note</button>
          {/* Display notes as a list */}
          <ul>
            {notes.map((note) => (
              <li key={note._id}>
                {note.content}
                <button className='start-button' onClick={() => deleteNoteFromMongoDB(note._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <textarea
            value={textValue}
            onChange={handleTextAreaChange}
            style={{ width: '100%', height: '600px' }}
            placeholder="Type your text here..."
          />
          <a ref={downloadLinkRef} style={{ display: 'none' }} />
        </>
      ) : (
        <>
          <p>You are not authenticated. Please log in.</p>
          <button className='start-button' onClick={() => loginWithRedirect()}>Log In</button>
        </>
      )}
    </div>
  );
};

export default ConditionalElement;
