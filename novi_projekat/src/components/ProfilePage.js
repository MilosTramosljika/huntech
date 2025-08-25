import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

function ProfilePage() {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    username: "",
    ime: "",
    prezime: "",
    lokacija: "",
    bio: "",
    broj_telefona: "",
    adresa: "",
    profile_picture_url: "",
    documentUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [showZahtjevModal, setShowZahtjevModal] = useState(false);
  const [razlog, setRazlog] = useState("");
  const [dokumentZahtjev, setDokumentZahtjev] = useState(null);

  // Ovdje cuvam URL dokumenta
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfileData({
            username: data.username || "",
            ime: data.ime || "",
            prezime: data.prezime || "",
            lokacija: data.lokacija || "",
            bio: data.bio || "",
            broj_telefona: data.broj_telefona || "",
            adresa: data.adresa || "",
            profile_picture_url: data.profile_picture_url || "",
            documentUrl: data.document_url || "", // path, ne URL
          });
        }
      } catch (err) {
        console.error("Greška pri učitavanju profila:", err.message);
        setError("Greška pri učitavanju profila.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Slika je prevelika. Maksimalna veličina je 5MB.");
        return;
      }

      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setError("Nevažeći format slike. Dozvoljeni formati: JPG, PNG, GIF.");
        return;
      }

      setNewProfileImage(file);
      setError(null); // Resetuj grešku
    }
  };

  const [newDocumentFile, setNewDocumentFile] = useState(null);

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        // npr. max 20MB za dokument
        setError("Dokument je prevelik. Maksimalna veličina je 20MB.");
        return;
      }

      setNewDocumentFile(file);
      setError(null);
    }
  };

  const handleSubmitZahtjev = async () => {
    try {
      // 1. Uzimamo auth korisnika
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Niste prijavljeni.");
      }

      let dokumentUrl = null;

      // 2. Ako je uploadovan dokument, šaljemo ga u bucket
      if (dokumentZahtjev) {
        const fileExt = dokumentZahtjev.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("zahtjeviZaPromjenuUloge")
          .upload(filePath, dokumentZahtjev);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("zahtjeviZaPromjenuUloge")
          .getPublicUrl(filePath);

        dokumentUrl = publicUrlData.publicUrl;
      }

      // 3. Insert u tabelu
      const { error } = await supabase
        .from("zahtjev_za_promjenu_uloge")
        .insert([
          {
            korisnik_id: user.id, // 👈 ovo je sada sigurno vezano na profiles.id
            obrazlozenje: razlog,
            dokument_url: dokumentUrl,
            // datum_podnosenja se puni sam (DEFAULT NOW())
          },
        ]);

      if (error) throw error;

      alert("Zahtjev uspješno podnesen ✅");
      setShowZahtjevModal(false);
      setRazlog("");
      setDokumentZahtjev(null);
    } catch (err) {
      console.error(err);
      alert("Greška pri slanju zahtjeva ❌");
    }
  };

  // --- Preuzimanje dokumenta ---
  const handleDownloadDocument = async () => {
    if (!profileData.documentUrl) return;

    try {
      const { data, error } = await supabase.storage
        .from("dokumenti")
        .createSignedUrl(profileData.documentUrl, 60 * 60); // link važi 1h

      if (error) throw error;

      window.open(data.signedUrl, "_blank");
    } catch (err) {
      console.error("Greška pri generisanju linka za dokument:", err.message);
      setError("Ne mogu da generišem link za dokument.");
    }
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    setError(null);
    setMessage(null);
    setImageUploading(true);

    try {
      let imageUrl = profileData.profile_picture_url;
      let documentUrlToSave = profileData.documentUrl;

      // Upload nove profilne slike
      if (newProfileImage) {
        const filePath = `${currentUser.id}/${Date.now()}-${newProfileImage.name}`;
        const { error: uploadError } = await supabase.storage
          .from("profile_images")
          .upload(filePath, newProfileImage, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("profile_images")
          .getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      if (newDocumentFile) {
        const filePath = `${currentUser.id}/${Date.now()}-${newDocumentFile.name}`;

        // Upload fajla u bucket "dokumenti"
        const { error: docUploadError } = await supabase.storage
          .from("dokumenti")
          .upload(filePath, newDocumentFile, { upsert: true });
        if (docUploadError) throw docUploadError;

        // Sačuvaj **samo path** u bazi
        const { error: dbError } = await supabase
          .from("profiles")
          .update({ document_url: filePath }) // path, ne cijeli URL
          .eq("id", currentUser.id);
        if (dbError) throw dbError;

        // Update state sa relativnim path-om
        documentUrlToSave = filePath;
        setProfileData((prev) => ({ ...prev, documentUrl: filePath }));
      }

      // Ažuriranje profila u bazi
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: profileData.username,
          ime: profileData.ime,
          prezime: profileData.prezime,
          broj_telefona: profileData.broj_telefona,
          adresa: profileData.adresa,
          lokacija: profileData.lokacija,
          bio: profileData.bio,
          profile_picture_url: imageUrl,
          document_url: documentUrlToSave, // <-- snake_case
        })
        .eq("id", currentUser.id);

      setProfileData((prev) => ({
        ...prev,
        profile_picture_url: imageUrl,
        documentUrl: documentUrlToSave,
      }));

      setNewProfileImage(null);
      setNewDocumentFile(null);
      setMessage("Profil uspešno ažuriran!");
      setIsEditing(false);
    } catch (err) {
      console.error("Greška pri ažuriranju profila:", err.message);
      let errorMessage = "Greška pri ažuriranju profila.";
      if (err.message.includes("row-level security")) {
        errorMessage = "Nemate dozvolu za izmenu profila.";
      } else if (err.message.includes("file size")) {
        errorMessage = "Fajl je prevelik.";
      } else if (err.message.includes("violates unique constraint")) {
        errorMessage = "Korisničko ime već postoji.";
      }
      setError(errorMessage);
    } finally {
      setImageUploading(false);
    }
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Učitavanje profila...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative", // 👈 ovo dodaj
      }}
    >
      <button
        title="ZAHTJEV ZA PROMJENU ULOGE" // 👈 tooltip sa punim tekstom
        onClick={() => setShowZahtjevModal(true)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#8289d6ff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px 6px", // 👈 smanjeni padding
          fontSize: "11px", // 👈 manja slova
          width: "160px", // 👈 fiksna širina
          cursor: "pointer",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        Zahtjev za Promjenu Uloge
      </button>

      <h2>Moj Profil</h2>

      {showZahtjevModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Zahtjev za promjenu uloge</h3>

            <label>
              Razlog:
              <textarea
                value={razlog}
                onChange={(e) => setRazlog(e.target.value)}
                style={{ width: "100%", minHeight: "80px", marginTop: "8px" }}
              />
            </label>

            <label style={{ display: "block", marginTop: "10px" }}>
              Priloži dokument:
              <input
                type="file"
                onChange={(e) => setDokumentZahtjev(e.target.files[0])}
              />
            </label>

            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button
                onClick={() => setShowZahtjevModal(false)}
                style={{ marginRight: "10px" }}
              >
                Otkaži
              </button>
              <button
                style={{
                  background: "#8289d6",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
                onClick={handleSubmitZahtjev}
              >
                Potvrdi
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>
      )}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {!isEditing ? (
        // Prikaz mod
        <div>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            {profileData.profile_picture_url ? (
              <img
                src={profileData.profile_picture_url}
                alt="Profilna slika"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #eee",
                }}
              />
            ) : (
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  backgroundColor: "#ddd",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  color: "#777",
                }}
              >
                ?
              </div>
            )}
          </div>
          <p>
            <strong>Email:</strong> {currentUser?.email}
          </p>
          <p>
            <strong>Korisničko ime:</strong>{" "}
            {profileData.username || "Nije postavljeno"}
          </p>
          <p>
            <strong>Ime:</strong> {profileData.ime}
          </p>
          <p>
            <strong>Prezime:</strong> {profileData.prezime}
          </p>
          <p>
            <strong>Broj telefona:</strong>{" "}
            {profileData.broj_telefona || "Nije postavljeno"}
          </p>
          <p>
            <strong>Adresa:</strong> {profileData.adresa || "Nije postavljeno"}
          </p>
          <p>
            <strong>Lokacija:</strong>{" "}
            {profileData.lokacija || "Nije postavljeno"}
          </p>
          <p>
            <strong>Bio:</strong> {profileData.bio || "Nije postavljeno"}
          </p>

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <strong>Dokument:</strong>{" "}
            {profileData.documentUrl ? (
              <button
                onClick={handleDownloadDocument}
                style={{
                  padding: "8px 18px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  justifyContent: "center",
                }}
              >
                📄 Pogledaj / Preuzmi Dokument
              </button>
            ) : (
              <span style={{ color: "#888", marginLeft: "10px" }}>
                Nema dokumenta
              </span>
            )}
          </div>

          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Uredi Profil
          </button>
        </div>
      ) : (
        // Uređivanje mod
        <div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email (Ne može se menjati):
            </label>
            <input
              type="email"
              value={currentUser?.email || ""}
              disabled
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                background: "#eee",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Korisničko ime:
            </label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Ime:
            </label>
            <input
              type="text"
              name="ime"
              value={profileData.ime}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Prezime:
            </label>
            <input
              type="text"
              name="prezime"
              value={profileData.prezime}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Broj telefona:
            </label>
            <input
              type="tel"
              name="broj_telefona"
              value={profileData.broj_telefona}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Adresa:
            </label>
            <input
              type="text"
              name="adresa"
              value={profileData.adresa}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Lokacija:
            </label>
            <input
              type="text"
              name="lokacija"
              value={profileData.lokacija}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Bio:
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows="4"
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            ></textarea>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Dokument:
            </label>

            <div style={{ marginTop: "10px" }}>
              <strong>Dokument:</strong>{" "}
              <button
                onClick={handleDownloadDocument}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Pogledaj / Preuzmi
              </button>
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
            {newDocumentFile && (
              <p style={{ color: "green", marginTop: "5px" }}>
                Odabrani dokument: {newDocumentFile.name}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Profilna slika:
            </label>

            {profileData.profile_picture_url && (
              <img
                src={profileData.profile_picture_url}
                alt="Trenutna profilna"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                  border: "2px solid #eee",
                }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
            <small
              style={{ display: "block", marginTop: "5px", color: "#666" }}
            >
              Max veličina: 5MB (JPG, PNG, GIF)
            </small>

            {newProfileImage && (
              <p style={{ color: "green", marginTop: "5px" }}>
                Odabrana nova slika: {newProfileImage.name}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleUpdateProfile}
              disabled={imageUploading}
              style={{
                padding: "10px 20px",
                backgroundColor: imageUploading ? "#6c757d" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {imageUploading ? "Čuvanje..." : "Sačuvaj Promene"}
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setNewProfileImage(null);
              }}
              disabled={imageUploading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Odustani
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
