"use client";

import {
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
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

const validationSchema = Yup.object({
  title: Yup.string().required(
    "Title is required",
  ),
  content: Yup.string(),
  tag: Yup.string().required(
    "Tag is required",
  ),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({
  onClose,
}: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      data: CreateNoteData,
    ) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      onClose();
    },
  });

  return (
    <Modal onClose={onClose}>
      <h2 className={css.title}>
        Create New Note
      </h2>
      <Formik
        initialValues={{
          title: "",
          content: "",
          tag: TAGS[0],
        }}
        validationSchema={
          validationSchema
        }
        onSubmit={(values) =>
          mutation.mutate(values)
        }
      >
        <Form className={css.form}>
          <label className={css.label}>
            Title
            <Field
              className={css.input}
              name="title"
              type="text"
              placeholder="Note title..."
            />
            <ErrorMessage
              name="title"
              component="span"
              className={css.error}
            />
          </label>

          <label className={css.label}>
            Content
            <Field
              className={css.textarea}
              name="content"
              as="textarea"
              placeholder="Note content..."
              rows={5}
            />
          </label>

          <label className={css.label}>
            Tag
            <Field
              className={css.select}
              name="tag"
              as="select"
            >
              {TAGS.map((t) => (
                <option
                  key={t}
                  value={t}
                >
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="tag"
              component="span"
              className={css.error}
            />
          </label>

          <div className={css.actions}>
            <button
              type="button"
              className={
                css.cancelButton
              }
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                css.submitButton
              }
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? "Creating..."
                : "Create Note"}
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}
