"use client";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [nama, setNama] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ttl, setttl] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await setDoc(doc(db, "user", email), {
        nama,
        email,
        password,
        ttl,
      });
      alert(" Berhasil Daftar ");
      router.push("/masuk");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <>
      <div class="hero-banner">
        <h1>BUAT AKUN BARU</h1>

        <p></p>
      </div>
      <form
        action=""
        class="form"
        id="form-pendaftaran-murid"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            placeholder="Masukkan Nama"
            class="input"
            id="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
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
        <div>
          <input
            type="date"
            class="input"
            id="tanggallahir"
            value={ttl}
            onChange={(e) => setttl(e.target.value)}
          />
        </div>
        <button type="submit">Daftar Sebagai Murid</button>
      </form>
    </>
  );
};

export default SignUpPage;
