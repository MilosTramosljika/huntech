// src/components/AdminPanel.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function AdminPanel() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("status", "PENDING_VERIFICATION");

    if (!error) setPendingUsers(data || []);
    setLoading(false);
  };

  const updateUserStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setPendingUsers(pendingUsers.filter((u) => u.id !== id));
      alert(`Korisnik je ${newStatus}`);
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Admin Panel - Verifikacija korisnika</h2>
      {pendingUsers.length === 0 ? (
        <p>Nema korisnika na čekanju.</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Email</th>
              <th>Korisničko ime</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Dokument</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.ime}</td>
                <td>{user.prezime}</td>
                <td>
                  {user.document_url ? (
                    <a
                      href={user.document_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pogledaj dokument
                    </a>
                  ) : (
                    "Nema dokumenta"
                  )}
                </td>
                <td>
                  <button onClick={() => updateUserStatus(user.id, "VERIFIED")}>
                    ✅ Verifikuj
                  </button>
                  <button onClick={() => updateUserStatus(user.id, "REJECTED")}>
                    ❌ Odbij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
