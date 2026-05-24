"use client";

import {
  useState,
  FormEvent,
} from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  value,
  onSearch,
}: SearchBarProps) {
  const [input, setInput] =
    useState(value);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      <input
        className={css.input}
        type="text"
        placeholder="Search notes..."
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
      />
      <button
        className={css.button}
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
