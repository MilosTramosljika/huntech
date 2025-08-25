import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userRoles, setUserRoles] = useState([]); // 👈 uloge korisnika
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setCurrentUser(session?.user ?? null);
//       setLoading(false);
//     };

//     getSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setCurrentUser(session?.user ?? null);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // 👇 Kad god se promijeni currentUser, dohvatimo njegove uloge
//   useEffect(() => {
//     const fetchRoles = async () => {
//       if (!currentUser) {
//         setUserRoles([]);
//         return;
//       }

//       try {
//         // 1. pronađi veze u tabeli korisnik_has_uloga
//         const { data: korisnikUloge, error: ulogeError } = await supabase
//           .from("korisnik_has_uloga")
//           .select("uloga_id")
//           .eq("profile_id", currentUser.id);

//         if (ulogeError || !korisnikUloge?.length) {
//           setUserRoles([]);
//           return;
//         }

//         // 2. dohvati nazive uloga iz tabele uloga
//         const { data: uloge, error: roleError } = await supabase
//           .from("uloga")
//           .select("naziv")
//           .in(
//             "id",
//             korisnikUloge.map((u) => u.uloga_id)
//           );

//         if (roleError || !uloge) {
//           setUserRoles([]);
//           return;
//         }

//         // 3. smjesti nazive u state
//         setUserRoles(uloge.map((u) => u.naziv));
//       } catch (err) {
//         console.error("Greška pri dohvaćanju uloga:", err);
//         setUserRoles([]);
//       }
//     };

//     fetchRoles();
//   }, [currentUser]);

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setCurrentUser(null);
//     setUserRoles([]);
//   };

//   const value = {
//     currentUser,
//     userRoles, // 👈 sada dostupno svuda
//     loading,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userRoles, setUserRoles] = useState([]);

//   useEffect(() => {
//     const getSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setCurrentUser(session?.user ?? null);
//       setLoading(false);
//     };

//     getSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       setCurrentUser(session?.user ?? null);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // 🔹 Kada se promijeni currentUser → dohvati uloge iz baze
//   useEffect(() => {
//     const fetchRoles = async () => {
//       if (!currentUser) {
//         setUserRoles([]);
//         return;
//       }

//       try {
//         const { data: korisnikUloge, error: ulogeError } = await supabase
//           .from("korisnik_has_uloga")
//           .select("uloga_id")
//           .eq("profile_id", currentUser.id);

//         if (ulogeError || !korisnikUloge?.length) {
//           setUserRoles([]);
//           return;
//         }

//         const { data: uloge, error: roleError } = await supabase
//           .from("uloga")
//           .select("naziv")
//           .in(
//             "id",
//             korisnikUloge.map((u) => u.uloga_id)
//           );

//         if (roleError || !uloge) {
//           setUserRoles([]);
//           return;
//         }

//         setUserRoles(uloge.map((u) => u.naziv));
//       } catch (err) {
//         console.error("❌ Greška kod dohvaćanja uloga:", err);
//         setUserRoles([]);
//       }
//     };

//     fetchRoles();
//   }, [currentUser]);

//   // 🔹 Funkcija za određivanje default rute
//   const getDefaultRoute = () => {
//     if (userRoles.includes("admin")) return "/admin";
//     if (userRoles.includes("dmz")) return "/dmz";
//     if (userRoles.includes("dlu")) return "/dlu";
//     if (userRoles.includes("lovac")) return "/lovac";
//     return "/profile";
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setCurrentUser(null);
//     setUserRoles([]);
//   };

//   const value = {
//     currentUser,
//     loading,
//     logout,
//     userRoles,
//     getDefaultRoute,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// src/contexts/AuthContext.js
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [profileStatus, setProfileStatus] = useState(null);
//   const [userRoles, setUserRoles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /**
//    * Dohvati profil i uloge na osnovu user.id (UUID)
//    */
//   const fetchUserData = async (user) => {
//     if (!user) {
//       console.log("⚠️ fetchUserData: nema user-a");
//       setUserRoles([]);
//       setProfileStatus(null);
//       return;
//     }

//     try {
//       console.log("🔍 fetchUserData: user.id =", user.id);

//       // 1. Dohvati profile
//       const { data: profile, error: profileError } = await supabase
//         .from("profiles")
//         .select("status")
//         .eq("id", user.id)
//         .single();

//       if (profileError) throw profileError;
//       console.log("📌 profile.status =", profile?.status);

//       setProfileStatus(profile?.status || null);

//       // 2. Dohvati uloge
//       const { data: rolesData, error: rolesError } = await supabase
//         .from("korisnik_has_uloga")
//         .select("uloga(name)")
//         .eq("korisnik_id", user.id);

//       if (rolesError) throw rolesError;
//       console.log("🎭 rolesData =", rolesData);

//       const roles = rolesData.map((r) => r.uloga.name);
//       console.log("🎭 userRoles =", roles);

//       setUserRoles(roles);
//     } catch (err) {
//       console.error("❌ fetchUserData error:", err);
//       setProfileStatus(null);
//       setUserRoles([]);
//     } finally {
//       setLoading(false); // ⚠️ jako bitno
//     }
//   };

//   /**
//    * Inicijalno učitavanje + osluškivanje promjena
//    */
//   useEffect(() => {
//     const init = async () => {
//       try {
//         setLoading(true);
//         console.log("⏳ init: pokrenut");

//         const {
//           data: { session },
//         } = await supabase.auth.getSession();

//         const user = session?.user ?? null;
//         console.log("👤 init: user =", user);

//         setCurrentUser(user);
//         await fetchUserData(user);
//       } catch (err) {
//         console.error("❌ Greška pri getSession:", err);
//       } finally {
//         setLoading(false);
//         console.log("✅ init: setLoading(false)");
//       }
//     };

//     init();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       try {
//         console.log("🔔 Auth state changed:", event);
//         setLoading(true);

//         const user = session?.user ?? null;
//         console.log("👤 onAuthStateChange: user =", user);

//         setCurrentUser(user);
//         await fetchUserData(user);
//       } catch (err) {
//         console.error("❌ Greška u onAuthStateChange:", err);
//       } finally {
//         setLoading(false);
//         console.log("✅ onAuthStateChange: setLoading(false)");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   /**
//    * Utility: default ruta prema statusu i ulozi
//    */
//   const getDefaultRoute = () => {
//     if (!currentUser) return "/login";

//     if (profileStatus === "PENDING_VERIFICATION") return "/pending";
//     if (profileStatus === "REJECTED") return "/rejected";

//     if (userRoles.includes("admin")) return "/admin";
//     if (userRoles.includes("dmz")) return "/dmz";
//     if (userRoles.includes("lovac")) return "/lovac";
//     if (userRoles.includes("dlu")) return "/dlu";

//     return "/profile"; // fallback
//   };

//   /**
//    * Auth akcije
//    */
//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     return data;
//   };

//   const register = async (email, password, metadata = {}) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: { data: metadata },
//     });
//     if (error) throw error;
//     return data;
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setCurrentUser(null);
//     setProfileStatus(null);
//     setUserRoles([]);
//   };

//   const value = {
//     currentUser,
//     profileStatus,
//     userRoles,
//     loading,
//     getDefaultRoute,
//     login,
//     register,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
