"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchNotes,
  createNote,
  deleteNote,
} from "@/lib/api";
import { CreateNoteData } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBar from "@/components/SearchBar/SearchBar";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import css from "./notes.module.css";

interface NotesClientProps {
  initialSearch: string;
  initialPage: number;
}

export default function NotesClient({
  initialSearch,
  initialPage,
}: NotesClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState(
    initialSearch,
  );
  const [page, setPage] = useState(
    initialPage,
  );
  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const { data, isLoading, error } =
    useQuery({
      queryKey: ["notes", page, search],
      queryFn: () =>
        fetchNotes(page, search),
    });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      setIsFormOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  function handleSearch(query: string) {
    setSearch(query);
    setPage(1);
    router.push(
      `/notes?search=${encodeURIComponent(query)}&page=1`,
    );
  }

  function handlePageChange(
    newPage: number,
  ) {
    setPage(newPage);
    router.push(
      `/notes?search=${encodeURIComponent(search)}&page=${newPage}`,
    );
  }

  function handleCreateNote(
    noteData: CreateNoteData,
  ) {
    createMutation.mutate(noteData);
  }

  function handleDeleteNote(
    id: string,
  ) {
    deleteMutation.mutate(id);
  }

  if (isLoading)
    return (
      <p>Loading, please wait...</p>
    );
  if (error)
    return (
      <p>
        Could not fetch the list of
        notes.{" "}
        {(error as Error).message}
      </p>
    );

  return (
    <div className={css.page}>
      <div className={css.toolbar}>
        <SearchBar
          value={search}
          onSearch={handleSearch}
        />
        <button
          className={css.addButton}
          onClick={() =>
            setIsFormOpen(true)
          }
        >
          + New Note
        </button>
      </div>

      {data && (
        <>
          <NoteList
            notes={data.notes}
            onDelete={handleDeleteNote}
          />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={
              handlePageChange
            }
          />
        </>
      )}

      {isFormOpen && (
        <NoteForm
          onSubmit={handleCreateNote}
          onClose={() =>
            setIsFormOpen(false)
          }
        />
      )}
    </div>
  );
}
