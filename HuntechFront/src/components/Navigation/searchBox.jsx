import React, { useState, useEffect, useRef } from "react";
import * as korisnikService from "../../services/korisnik.service";
import "./searchBox.css"; // poseban CSS za search

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const wrapperRef = useRef(null);

  // Dohvatanje korisnika
  useEffect(() => {
    async function fetchUsers() {
      const response = await korisnikService.getAllUsers();
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  // Filtriranje korisnika po unetom tekstu
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchText, users]);

  // Klik van search box-a sakriva listu
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowResults(true)} // pokaži rezultate kad input dobije fokus
      />

      {showResults && filteredUsers.length > 0 && (
        <ul className="search-results">
          {filteredUsers.map(user => (
            <li
              key={user.id}
              className={selectedUserId === user.id ? "selected" : ""}
              onClick={() => setSelectedUserId(user.id)}
            >
              <img
                src={
                  user.slika || "http://localhost:8080/korisniks/uploads/default-avatar.png"
                }
                alt={user.username}
              />
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
