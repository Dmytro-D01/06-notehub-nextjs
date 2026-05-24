"use client";

import {
  useState,
  useEffect,
  useCallback,
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

  const debouncedSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        onSearch(query);
      }, 500);
      return () => clearTimeout(timer);
    },
    [onSearch],
  );

  useEffect(() => {
    const cleanup =
      debouncedSearch(input);
    return cleanup;
  }, [input, debouncedSearch]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      value={input}
      onChange={(e) =>
        setInput(e.target.value)
      }
    />
  );
}
