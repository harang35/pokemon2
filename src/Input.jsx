import { forwardRef } from "react";

const Input = forwardRef(({ value, onChange, onKeyDown, onSearch }, ref) => {
  return (
    <div className="search-input">
      <input
        ref={ref}
        type="text"
        placeholder="Search"
        className="input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button type="button" className="search-icon" onClick={onSearch}>
        🔍
      </button>
    </div>
  );
});

export default Input;
