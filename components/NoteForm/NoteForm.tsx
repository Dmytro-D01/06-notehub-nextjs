"use client";

import {
  useState,
  FormEvent,
} from "react";
import { CreateNoteData } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NoteForm.module.css";

const TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

interface NoteFormProps {
  onSubmit: (
    data: CreateNoteData,
  ) => void;
  onClose: () => void;
}

export default function NoteForm({
  onSubmit,
  onClose,
}: NoteFormProps) {
  const [title, setTitle] =
    useState("");
  const [content, setContent] =
    useState("");
  const [tag, setTag] = useState(
    TAGS[0],
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !title.trim() ||
      !content.trim()
    )
      return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      tag,
    });
  }

  return (
    <Modal onClose={onClose}>
      <h2 className={css.title}>
        Create New Note
      </h2>
      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <label className={css.label}>
          Title
          <input
            className={css.input}
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Note title..."
            required
          />
        </label>
        <label className={css.label}>
          Content
          <textarea
            className={css.textarea}
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Note content..."
            rows={5}
            required
          />
        </label>
        <label className={css.label}>
          Tag
          <select
            className={css.select}
            value={tag}
            onChange={(e) =>
              setTag(e.target.value)
            }
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
          >
            Create Note
          </button>
        </div>
      </form>
    </Modal>
  );
}
