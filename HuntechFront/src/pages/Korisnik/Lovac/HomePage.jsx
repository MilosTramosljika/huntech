import React, { useState, useMemo } from "react";
import styles from "./HomePage.module.css";
import { Filter } from "lucide-react";

// Mock podaci za grupe i objave
const allGroups = [
  { id: "opsta", name: "Opšta grupa" },
  { id: "jaruzani", name: "Lovačka sekcija Jaružani" },
  { id: "trofej", name: "LU Trofej Kotor Varoš" },
  { id: "lovci123", name: "Lovačko udruženje 123" },
];

const mockPosts = [
  {
    id: 1,
    group: "opsta",
    author: "Marko",
    content: "Dobro jutro lovci! 🦌",
    timestamp: new Date("2025-08-17T09:30:00"),
  },
  {
    id: 2,
    group: "trofej",
    author: "Petar",
    content: "Danas imamo sastanak u domu.",
    timestamp: new Date("2025-08-17T10:15:00"),
  },
  {
    id: 3,
    group: "jaruzani",
    author: "Milan",
    content: "Jaružani izlaze u lov sutra u 6h!",
    timestamp: new Date("2025-08-17T11:00:00"),
  },
  {
    id: 4,
    group: "lovci123",
    author: "Nikola",
    content: "Nova pravila za lovnu sezonu objavljena.",
    timestamp: new Date("2025-08-16T18:00:00"),
  },
];

export default function HomePage() {
  const [selectedGroups, setSelectedGroups] = useState(
    allGroups.map((g) => g.id) // sve grupe aktivne po defaultu
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filtriranje i sortiranje objava
  const filteredPosts = useMemo(() => {
    return mockPosts
      .filter((post) => selectedGroups.includes(post.group))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [selectedGroups]);

  const toggleGroup = (id) => {
    setSelectedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.feed}>
        {filteredPosts.length === 0 ? (
          <p className={styles.noPosts}>Nema objava za odabrane grupe.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <span className={styles.author}>{post.author}</span>
                <span className={styles.group}>
                  {allGroups.find((g) => g.id === post.group)?.name}
                </span>
              </div>
              <p className={styles.content}>{post.content}</p>
              <span className={styles.timestamp}>
                {post.timestamp.toLocaleString("sr-RS")}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Floating filter dugme */}
      <div className={styles.floatingButtonWrapper}>
        <button
          className={styles.floatingButton}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Filter size={22} />
        </button>

        {dropdownOpen && (
          <div className={styles.dropdown}>
            {allGroups.map((group) => (
              <label key={group.id} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={selectedGroups.includes(group.id)}
                  onChange={() => toggleGroup(group.id)}
                />
                {group.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
