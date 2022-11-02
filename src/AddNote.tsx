import React, { useState } from "react";

export interface AddNoteProps {
  onCancel: Function;
  nodeID: Number;
  onSave: Function;
}

const AddNote: React.FC<AddNoteProps> = ({ onCancel, nodeID, onSave }) => {
  const [note, setNote] = useState("");
  return (
    <div className="node-editor-container">
      <div className="note-editor-textarea-wrap">
        <textarea
          value={note}
          className="note-editor-textarea"
          placeholder="Enter Note"
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <div className="note-editor-button-wrap">
        <button
          className="note-editor-button-secondary"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
        <button
          className={`note-editor-button-primary ${
            note.trim() !== "" ? "primary-active" : ""
          }`}
          onClick={() => onSave(note)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
