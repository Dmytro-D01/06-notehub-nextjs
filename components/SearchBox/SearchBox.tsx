"use client";

import {
  useState,
  useEffect,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

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
