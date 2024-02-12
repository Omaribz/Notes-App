import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";

const NotesCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openNotesModal = () => {
    setModalOpen(true);
  };

  const closeNotesModal = () => {
    setModalOpen(false);
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

  // const removeNote = (id) => {
  //   const updatedNotes = notes.filter((note) => note.id !== id);
  //   setNotes(updatedNotes);
  // };

  return (
    <div className="block mx-auto">
      <div className=" mx-auto flex justify-between items-center mt-10 ml-8 space-x-20 lg:space-x-96">
        <h1 className="text-3xl text-blue-950 font-bold mr-20 sm:mr-10">Notes</h1>
        <MdAddCircle className="size-7" onClick={openNotesModal} />
      </div>

      {isModalOpen && (
        <div className="flex items-center justify-center mt-10">
          <div className=" mx-auto rounded-2xl bg-white shadow-xl p-5 max-w-md w-full">
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
              {newNote && newNote.length <= 10 && <p className="text-red-500 mb-2">notes should be greater than 10</p>}
              <button
                type="submit"
                className="w-full rounded-lg shadow-xl py-1 text-white bg-violet-800"
                onClick={() =>{
                  addNote(),
                  closeNotesModal()
                }
                }
              >
                Add note
              </button>
              <button
                type="button"
                className=" w-full rounded-lg shadow-xl py-1 text-white bg-red-700 mt-2"
                onClick={closeNotesModal}
              >
                Close
              </button>
            </form>
          </div>
        </div> 
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`relative m-4 p-2 rounded-lg shadow-lg ${note.color} w-[250px] h-[250px] mt-10`}
          >
            <p className="text-lg font-semibold break-words">{note.content}</p>
            <p className="absolute bottom-5 text-sm font-semibold text-gray-600 ">{note.time}</p>
              {/* <button
                type="button"
                aria-label="button"
                onClick={() => removeNote(note.id)}
              >
                <IoMdClose
                  size={18}
                  className="font-extrabold text-neutral-dark absolute right-20 top-7"
                />
              </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesCard;
