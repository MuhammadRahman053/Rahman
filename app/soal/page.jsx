import React from "react";
import Card from "./Card";

const Simulasi = () => {
  return (
    <div>
      <div className="w-full h-96 bg-[url('/DashboardBackground.jpg')]">
        <div className="flex h-full items-center justify-center flex-col gap-4 bg-black/50">
          <img
            src="/Paper.svg"
            width={150}
            alt=""
            className="rounded-full invert"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-sm">Soal</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-16 flex-wrap p-16">
        <Card
          variant={"red"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/ss pers 1.png"
          penjelasan=" Persamaan Kuadrat :"
          rumus={"Ax^2 + Bx + C$ dengan syarat $A = 1$, B dan C positif "}
          id="faktorisasi_persamaan_kuadrat"
          tipe="soal"
        />
        <Card
          variant={"purple"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/ss pers 2.png"
          penjelasan="Persamaan Kuadrat :"
          rumus={
            "Ax^2 + Bx + C$ dengan syarat $A = 1$, B dan C positif atau negatif "
          }
          id="faktorisasi_persamaan_kuadrat1"
          tipe="soal"
        />
        <Card
          variant={"cyan"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/ss pers 3.png"
          penjelasan="Persamaan Kuadrat :"
          rumus={"Ax^2 + Bx + C$ dengan syarat $A > 1$, B dan C positif "}
          id="faktorisasi_persamaan_kuadrat2"
          tipe="soal"
        />
        <Card
          variant={"yellow"}
          title="FAKTORISASI PERSAMAAN KUADRAT"
          img="/ss pers 4.png"
          penjelasan="Persamaan Kuadrat :"
          rumus={
            "Ax^2 + Bx + C$ dengan syarat $A > 1$, B dan C positif atau negatif "
          }
          id="faktorisasi_persamaan_kuadrat3"
          tipe="soal"
        />
      </div>
    </div>
  );
};

export default Simulasi;
