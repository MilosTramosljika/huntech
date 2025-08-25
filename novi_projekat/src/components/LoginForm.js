import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1) Login
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (loginError) {
        toast.error("❌ Greška pri loginu: " + loginError.message);
        return;
      }
      const user = data?.user;
      if (!user) {
        toast.error("❌ Nevažeći odgovor pri loginu.");
        return;
      }

      // 2) Profil (po user.id)
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, status")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        toast.error("❌ Nema profila za ovog korisnika!");
        // nema potrebe čekati odjavu
        supabase.auth.signOut().catch(() => {});
        return;
      }

      // 3) Status – prvo NAVIGATE, pa odjava (bez await)
      if (profile.status === "PENDING_VERIFICATION") {
        toast("⌛ Vaš profil čeka verifikaciju.");
        navigate("/pending", { replace: true });
        supabase.auth.signOut().catch(() => {});
        return;
      }

      if (profile.status === "REJECTED") {
        toast.error("⛔ Vaš profil je odbijen.");
        navigate("/rejected", { replace: true });
        supabase.auth.signOut().catch(() => {});
        return;
      }

      if (profile.status !== "ACTIVE") {
        toast.error("⚠️ Profil nije aktivan.");
        supabase.auth.signOut().catch(() => {});
        return;
      }

      // 4) Uloge (samo za ACTIVE)
      const { data: korisnikUloge, error: ulogeError } = await supabase
        .from("korisnik_has_uloga")
        .select("uloga_id")
        .eq("profile_id", profile.id);

      if (ulogeError || !korisnikUloge?.length) {
        toast.warning("⚠️ Niste dodijeljeni nijednoj ulozi.");
        return;
      }

      const { data: uloge, error: roleError } = await supabase
        .from("uloga")
        .select("id, naziv")
        .in(
          "id",
          korisnikUloge.map((u) => u.uloga_id)
        );

      if (roleError || !uloge) {
        toast.error("❌ Greška pri dohvaćanju naziva uloga");
        return;
      }

      // 5) Routing prema ulozi
      const roleNames = uloge.map((u) => u.naziv);

      if (roleNames.includes("admin")) {
        navigate("/admin", { replace: true });
        return;
      }
      if (roleNames.includes("lovac")) {
        navigate("/lovac", { replace: true });
        return;
      }
      if (roleNames.includes("dmz")) {
        navigate("/dmz", { replace: true });
        return;
      }
      if (roleNames.includes("dlu")) {
        navigate("/dlu", { replace: true });
        return;
      }

      toast.warning("⚠️ Nije pronađena odgovarajuća ruta za vašu ulogu.");
    } catch (err) {
      toast.error("❌ Greška: " + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Prijava Korisnika</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="login-email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="login-password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Lozinka:
          </label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Prijava u toku..." : "Prijavi se"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <p>
          Nemate račun?{" "}
          <a href="/register" style={{ color: "#007BFF" }}>
            Registrujte se
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
