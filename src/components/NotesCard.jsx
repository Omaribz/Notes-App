import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Dialog } from '@headlessui/react';

const NotesCard = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const openNotesModal = () => {
    setModalOpen(true);
  };

  const closeNotesModal = () => {
    setModalOpen(false);
    setNewNote('');
  };
  
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const [notes, setNotes] = useState([]);

  const generateRandomColor = () => {
    const colors = ['bg-red-500', 'bg-lime-500', 'bg-teal-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-rose-600'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const currentTime = new Date().toLocaleString();
      const newNoteObj = {
        id: Math.random(),
        content: newNote,
        color: generateRandomColor(),
        time: currentTime
      };
      setNotes([...notes, newNoteObj]);
      setNewNote('');
    }
  };

  return (
    <div className="flex-col">
      <div className=" flex justify-between mt-10 mx-10 lg:mx-20">
        <h1 className=" text-4xl lg:text-3xl text-blue-950 font-bold">Notes</h1>
        <MdAddCircle className=" size-9 lg:size-7 cursor-pointer mt-1.5" onClick={openNotesModal} />
      </div>
    {isModalOpen && (
      <Dialog
        open={isModalOpen}
        onClose={closeNotesModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true">
        <div className="flex mt-24">
          <div className="rounded-2xl bg-white shadow-xl p-5  mx-auto max-w-lg w-11/12">
            <form>
              <textarea
                placeholder="Write your notes here.."
                rows={5}
                cols={5}
                required
                className="border border-black w-full rounded-lg pl-3 pt-3"
                onChange={handleNoteChange}
                value={newNote}
              />
              {newNote && newNote.trim().length <= 4 && <p className="text-red-500 mb-2">Notes should be atleast 4 characters</p>}
              {newNote && newNote.trim().length > 120 && <p className="text-red-500 mb-2">Notes should be utmost 120 characters</p>}
              <button
                type="submit"
                className="w-full rounded-lg shadow-xl py-1 text-white bg-violet-800 hover:bg-violet-600 disabled:bg-slate-300"
                onClick={() =>{
                  addNote(),
                  closeNotesModal()
                }
                }
                disabled={newNote && newNote.trim().length > 120 || newNote.trim().length < 4}
              >
                Add
              </button>
              <button
                type="button"
                className=" w-full rounded-lg shadow-xl py-1 text-white bg-red-700 hover:bg-red-500 mt-2"
                onClick={closeNotesModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
        </div> 
        </Dialog>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`relative mx-auto p-2 rounded-lg ${note.color} w-[250px] h-[250px] mt-4`}
          >
            <p className="text-lg font-semibold break-words">{note.content}</p>
            <p className="absolute bottom-5 text-sm font-semibold text-gray-600 ">{note.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesCard;
