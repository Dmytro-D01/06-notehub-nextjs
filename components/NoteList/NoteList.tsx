import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({
  notes,
  onDelete,
}: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className={css.empty}>
        No notes found.
      </p>
    );
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li
          key={note.id}
          className={css.item}
        >
          <div className={css.header}>
            <h3
              className={css.noteTitle}
            >
              {note.title}
            </h3>
            <span className={css.tag}>
              {note.tag}
            </span>
          </div>
          <p className={css.content}>
            {note.content}
          </p>
          <div className={css.actions}>
            <Link
              href={`/notes/${note.id}`}
              className={css.viewLink}
            >
              View details
            </Link>
            <button
              className={
                css.deleteButton
              }
              onClick={() =>
                onDelete(note.id)
              }
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
