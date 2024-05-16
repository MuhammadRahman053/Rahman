import React from "react";
import Card from "./Card";

const Simulasi = () => {
  return (
    <div>
      <div className="w-full h-96 bg-[url('/DashboardBackground.jpg')]">
        <div className="flex h-full items-center justify-center flex-col gap-4 bg-black/50">
          <img
            src="/Icon Simulasi 1 .png"
            width={150}
            alt=""
            className="rounded-full invert"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-sm">Simulasi</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-16 flex-wrap p-16">
        <Card
          variant={"blue"}
          title="OPERASI HITUNG ALJABAR"
          img="/simulasi 1 .png"
          penjelasan="Menentukan hasil operasi penjumlahan dan pengurangan aljabar menggunakan Blok Aljabar"
          id="operasi_hitung_aljabar"
        />
        <Card
          variant={"green"}
          title="PERKALIAN DUA SUKU"
          img="/simulasi 2.png"
          penjelasan="Menentukan hasil perkalian suku dua dan suku dua menggunakan Blok Aljabar"
          id="perkalian_dua_suku"
        />
        <Card
          variant={"red"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/simulasi 3.png"
          penjelasan=" Persamaan Kuadrat :"
          rumus={"Ax^2 + Bx + C$ dengan syarat $A = 1$, B dan C positif "}
          id="faktorisasi_persamaan_kuadrat"
        />
        <Card
          variant={"purple"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/simulasi 4 .png"
          penjelasan="Persamaan Kuadrat :"
          rumus={
            "Ax^2 + Bx + C$ dengan syarat $A = 1$, B dan C positif atau negatif "
          }
          id="faktorisasi_persamaan_kuadrat1"
        />
        <Card
          variant={"cyan"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/simulasi 5.png"
          penjelasan="Persamaan Kuadrat :"
          rumus={"Ax^2 + Bx + C$ dengan syarat $A > 1$, B dan C positif "}
          id="faktorisasi_persamaan_kuadrat2"
        />
        <Card
          variant={"yellow"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/simulasi 6.png"
          penjelasan="Persamaan Kuadrat :"
          rumus={
            "Ax^2 + Bx + C$ dengan syarat $A > 1$, B dan C positif atau negatif "
          }
          id="faktorisasi_persamaan_kuadrat3"
        />
      </div>
    </div>
  );
};

export default Simulasi;
