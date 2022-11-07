import React from "react";
import "./EditNote.css";

export interface EditNoteProps {
  content: string;
  onEdit: Function;
  onDelete: Function;
}

const EditNote: React.FC<EditNoteProps> = ({ content, onEdit, onDelete }) => {
  const onEditClick = () => {
    onEdit(true);
  };

  const onDeleteClick = () => {
    onEdit(false);
    onDelete();
  };
  return (
    <div className="note-view-wrap">
      <div className="note-view">
        <div className="note-view-text">{content}</div>
        <div className="note-view-icon-wrap" onClick={onEditClick}>
          Edit
        </div>
        <div className="note-view-icon-wrap" onClick={onDeleteClick}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default EditNote;
