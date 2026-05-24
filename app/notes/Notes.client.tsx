"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import css from "./notes.module.css";

export default function NotesClient() {
  const router = useRouter();
  const [search, setSearch] =
    useState("");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const { data, isLoading, error } =
    useQuery({
      queryKey: ["notes", page, search],
      queryFn: () =>
        fetchNotes(page, search),
      placeholderData: (prev) => prev,
      refetchOnMount: false,
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
        <SearchBox
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

      {data &&
        data.notes.length > 0 && (
          <NoteList
            notes={data.notes}
          />
        )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={
            handlePageChange
          }
        />
      )}

      {isFormOpen && (
        <NoteForm
          onClose={() =>
            setIsFormOpen(false)
          }
        />
      )}
    </div>
  );
}
