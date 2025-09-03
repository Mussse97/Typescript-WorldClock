
import React from "react";


interface SearchBarProps {
value: string;
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
return (
<form className="search" onSubmit={onSubmit} role="search">
<input
className="search__input"
type="text"
placeholder="Search for a city…"
value={value}
onChange={onChange}
aria-label="Search cities"
/>
<button className="search__btn" type="submit">Search</button>
</form>
);
};


export default SearchBar;