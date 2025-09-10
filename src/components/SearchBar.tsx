import React from "react";

interface SearchBarProps<T> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  results?: T[];
  renderResult?: (item: T) => React.ReactNode;
}

export default function SearchBar<T>({
  value,
  results,
  onChange,
  onSubmit,
  renderResult,
}: SearchBarProps<T>) {
  return (
    <form className="search" onSubmit={onSubmit} role="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search…"
        value={value}
        onChange={onChange}
        aria-label="Search"
      />
      <button className="search__btn" type="submit">Search</button>

      {results && renderResult && (
        <div className="results">
          {results.map((item, idx) => (
            <div key={idx}>{renderResult(item)}</div>
          ))}
        </div>
      )}
    </form>
  );
}
