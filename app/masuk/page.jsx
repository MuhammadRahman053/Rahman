"use client";
import React, { useState } from "react";
import { getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, db, provider } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("berhasil masuk");
    } catch (error) {
      console.log({ error });
    }
  };
  const loginWithGoogle = async () => {
    console.log("test");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      console.log(email);
      const docRef = doc(db, "user", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        alert("Selamat Datang " + docSnap.data().nama);
        router.push("/dashboard");
        console.log("Document data:", docSnap.data());
      } else {
        alert("Anda belum terdaftar");
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div>
      <div class="hero-banner">
        <h1>Masuk</h1>

        <p></p>
      </div>
      <div className="py-8 flex items-center justify-center">
        <button
          type="button"
          className="flex items-center gap-2 bg-white px-8 py-2 text-black rounded-3xl hover:scale-110 transition-all"
          onClick={loginWithGoogle}
        >
          <img src="/Icon google.png" width={16} alt="" />
          <p>Google</p>
        </button>
      </div>
      <form
        action=""
        class="form"
        id="form-pendaftaran-murid"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            id="email"
            placeholder="Masukkan Email"
            class="input"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <input
            class="input"
            type="password"
            id="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
};

export default LoginPage;
