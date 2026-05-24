"use client";

import {
  useState,
  FormEvent,
} from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({
  value,
  onSearch,
}: SearchBoxProps) {
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
