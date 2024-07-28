import Link from "next/link";
import React from "react";
const list_BAB = [
  "Operasi Hitung Alajabar",
  "Perkalian Dua Suku",
  "Faktorisasi Persamaan Kuadrat 1",
  "Faktorisasi Persamaan Kuadrat 2",
  "Faktorisasi Persamaan Kuadrat 3",
  "Faktorisasi Persamaan Kuadrat 4",
];
const tujuan = [
  "operasi_hitung_aljabar",
  "perkalian_dua_suku",
  "faktorisasi_persamaan_kuadrat",
  "faktorisasi_persamaan_kuadrat1",
  "faktorisasi_persamaan_kuadrat2",
  "faktorisasi_persamaan_kuadrat3",
];
const SimulasiSelanjutnya = ({ Babsekarang }) => {
  return (
    <div className="absolute right-8 top-4 items-center h-full">
      <div className="flex flex-col items-end py-3 px-6 bg-slate-50 rounded-xl shadow-xl ring-1 ring-slate-300">
        <p className="text-sm text-slate-700">Simulasi Selanjutnya</p>
        <Link
          href={`/simulasi/${tujuan[Babsekarang]}`}
          className="font-bold text-blue-500 hover:text-blue-600 cursor-pointer z-10 transition-all"
        >
          {list_BAB[Babsekarang]} &rarr;
        </Link>
      </div>
    </div>
  );
};
const SimulasiSebelumnya = ({ Babsekarang }) => {
  return (
    <div className="absolute left-8 top-4 items-center h-full">
      <div className="flex flex-col items-end py-3 px-6 bg-slate-50 rounded-xl shadow-xl ring-1 ring-slate-300">
        <p className="text-sm text-slate-700">Simulasi Sebelumnya</p>
        <Link
          href={`/simulasi/${tujuan[Babsekarang - 2]}`}
          className="font-bold text-blue-500 hover:text-blue-600 cursor-pointer z-10 transition-all"
        >
          &larr; {list_BAB[Babsekarang - 2]}
        </Link>
      </div>
    </div>
  );
};

export { SimulasiSebelumnya, SimulasiSelanjutnya };
