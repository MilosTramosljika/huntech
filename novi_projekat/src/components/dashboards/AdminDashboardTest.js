// src/components/admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Učitavanje korisnika sa PENDING_VERIFICATION
  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "PENDING_VERIFICATION");

      if (error) {
        console.error("Greška prilikom učitavanja korisnika:", error.message);
      } else {
        setPendingUsers(data || []);
      }
      setLoading(false);
    };

    fetchPendingUsers();
  }, []);

  // Funkcija za ažuriranje statusa
  const updateUserStatus = async (userId, newStatus) => {
    setActionLoading(userId);
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", userId);

    if (error) {
      console.error("Greška prilikom ažuriranja statusa:", error.message);
    } else {
      setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    }
    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pendingUsers.length === 0 ? (
        <p className="text-gray-600 text-center col-span-full">
          Nema korisnika koji čekaju verifikaciju.
        </p>
      ) : (
        pendingUsers.map((user) => (
          <Card
            key={user.id}
            className="shadow-lg rounded-2xl border border-gray-200"
          >
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {user.ime} {user.prezime}
              </h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Korisničko ime:</strong> {user.username}
              </p>
              <p>
                <strong>Broj telefona:</strong> {user.broj_telefona || "N/A"}
              </p>
              <p>
                <strong>Adresa:</strong> {user.adresa || "N/A"}
              </p>

              {user.document_url ? (
                <a
                  href={user.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  📄 Pogledaj dokument
                </a>
              ) : (
                <p className="text-red-500">Nema priložen dokument</p>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => updateUserStatus(user.id, "APPROVED")}
                  disabled={actionLoading === user.id}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2"
                >
                  {actionLoading === user.id ? "Obrada..." : "✅ Odobri"}
                </Button>
                <Button
                  onClick={() => updateUserStatus(user.id, "REJECTED")}
                  disabled={actionLoading === user.id}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2"
                >
                  {actionLoading === user.id ? "Obrada..." : "❌ Odbij"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
