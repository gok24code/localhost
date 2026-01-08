"use client";

import { useState } from "react";
import styles from "../support.module.css"; // Reuse support page styles

export default function WebSearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      // Redirect to Google search
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., 'React hook useEffect infinite loop'"
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
}
