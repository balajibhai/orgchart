import React from "react";
import "./EditNote.css";

export interface EditNoteProps {
  content: string;
}

const EditNote: React.FC<EditNoteProps> = ({ content }) => {
  console.log("content: ", content);
  return (
    <div className="note-view-wrap">
      <div className="note-view">
        <div className="note-view-text">{content}</div>
        <div className="note-view-icon-wrap" onClick={(e) => null}>
          Edit
        </div>
        <div className="note-view-icon-wrap" onClick={(e) => null}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default EditNote;
