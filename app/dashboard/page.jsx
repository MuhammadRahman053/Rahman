"use client";
import React, { useEffect } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
const DashboardPage = () => {
  const user = auth.currentUser;
  console.log({ user });
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });
  return (
    <div>
      <div className="w-full h-96 bg-[url('/DashboardBackground.jpg')]">
        <div className="flex h-full items-center px-48 gap-4 bg-black/50">
          <img
            src={user?.photoURL}
            width={150}
            alt=""
            className="rounded-full"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-sm">
              {user?.displayName}
            </h1>
            <p className="text-3xl text-white/70">Dasbor Siswa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
