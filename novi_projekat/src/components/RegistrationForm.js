// src/components/RegistrationForm.js
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Dozvoljeni formati za profilnu sliku su: JPG, PNG.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Profilna slika je prevelika (max 5MB).");
        return;
      }
      setProfileImage(file);
      setError("");
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Dozvoljeni formati dokumenta: PDF, DOC, DOCX.");
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setError("Dokument je prevelik (max 20MB).");
        return;
      }
      setDocumentFile(file);
      setError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      const user = data.user;
      if (!user) throw new Error("Neuspješna registracija.");

      let imageUrl = "";
      let documentUrl = "";

      if (profileImage) {
        const imagePath = `${user.id}/${Date.now()}-${profileImage.name}`;
        const { error: imageUploadError } = await supabase.storage
          .from("profile_images")
          .upload(imagePath, profileImage);

        if (imageUploadError) throw imageUploadError;

        const { data: imageUrlData } = supabase.storage
          .from("profile_images")
          .getPublicUrl(imagePath);

        imageUrl = imageUrlData.publicUrl;
      }

      if (documentFile) {
        const documentPath = `${user.id}/${Date.now()}-${documentFile.name}`;

        const { error: docUploadError } = await supabase.storage
          .from("dokumenti")
          .upload(documentPath, documentFile);

        if (docUploadError) throw docUploadError;

        // SPREMI SAMO PATH u bazi
        documentUrl = documentPath;
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        email,
        username,
        ime: firstName,
        prezime: lastName,
        broj_telefona: phoneNumber,
        adresa: address,
        profile_picture_url: imageUrl,
        document_url: documentUrl,
        status: "PENDING_VERIFICATION",
      });

      if (profileError) throw profileError;

      setSuccess("Registracija uspješna! Vaš nalog je u fazi verifikacije.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Greška pri registraciji.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        Registracija
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Ime"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Prezime"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Broj telefona"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Adresa"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />

        {/* Upload sekcija */}
        <div className="mt-6 p-5 bg-gray-50 border-2 border-dashed border-green-400 rounded-xl text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Upload fajlova
          </h3>

          {/* Profilna slika */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Profilna slika
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-100 file:text-green-700
                        hover:file:bg-green-200 cursor-pointer"
            />
            <small className="text-gray-500 text-xs block mt-1">
              Dozvoljeni formati: JPG, PNG (max 5MB)
            </small>
          </div>

          {/* Dokument */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Dokument za verifikaciju
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentChange}
              className="block w-full text-sm text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-100 file:text-green-700
                        hover:file:bg-green-200 cursor-pointer"
            />
            <small className="text-gray-500 text-xs block mt-1">
              Dozvoljeni formati: PDF, DOC, DOCX (max 20MB)
            </small>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          {loading ? "Registracija..." : "Registruj se"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
