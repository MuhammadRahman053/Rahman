import Image from "next/image";
import React, { useState } from "react";
const TOTAL_STEP = 10;
const Penjelasan = [
  "Klik kiri pada block tersebut untuk memulai mengerjakan soal tentang persamaan kuadrat .",
  "Setelah block di klik, block akan muncul pada playground dan susunlah block tersebut menjadi bentuk persegi panjang atau persegi sesuai dengan soal yang diminta ",
  "Setelah menyusun block tekanlah tombol check bentuk untuk memeriksa apakah susunan bentuk yang kalian buat sudah benar dan sesuai dengan soal ",
  "Jika bentuk masih salah maka akan keluar pesan seperti ini😭, maka anda harus menyusun ulang blok tersebut sampai benar",
  "Jika bentuk susunan benar maka akan keluar pesan seperti ini🤩. Jika susunan blok sudah benar maka anda dapat melanjutkan step berikutnya",
  "Jika anda menemui soal yang mengharuskan anda menyusun blok tersebut dalam jumlah banyak maka anda dapat menekan blok tersebut tersebut selama 1 detik, akan muncul tulisan yang menawarkan anda untuk memilih berapa jumlah blok yang anda butuhkan, tulisan tersebut tertera di layar seperti berikut",
  "Identifikasi panjang dan lebar dari susunan blok yang telah anda buat, lalu ketik panjang dan lebar pada kotak yang telah disediakan",
  "Setelah anda mengisi lebar, panjang, dan memilih bentuk pada kotak yang telah disediakan, tentukan masing masing akar dari persamaan kuadrat yang diminta oleh soal",
  "Setelah mengisi akar dari persamaan kuadrat akan muncul himpunan penyelesaian, silahkan check jawaban anda dengan menekan tombol check hasil",
  "Jika panjang, lebar, dan pilihan bentuk anda salah maka akan muncul pesan seperti berikut😭, silahkan anda coba untuk memeriksa dan mengisi ulang jawaban anda sampai benar sesuai dengan pesan yang muncul pada layar ",
  "Jika semua jawaban anda sudah benar maka akan muncul pesan seperti ini 🤩, lalu anda dapat mencoba soal berikutnya",
];
const Gambar = [
  "/Tutorialsoal1.png",
  "/Tutorialsoal2.png",
  "/Tutorialsoal3.png",
  "/Tutorialsoal4.png",
  "/Tutorialsoal5.png",
  "/Tutorialsoal6.png",
  "/Tutorialsoal7.png",
  "/Tutorialsoal8.png",
  "/Tutorialsoal9.png",
  "/Tutorialsoal10.png",
  "/Tutorialsoal11.png",
];
const Tutorial = () => {
  const [step, setStep] = useState(0);
  const [isShowing, setisShowing] = useState(true);
  return (
    <>
      <div
        onClick={() => setisShowing(true)}
        className="absolute right-12 top-20 w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 shadow-lg ring-2 ring-black/20 border-4 border-white cursor-pointer hover:scale-110 transition-all z-20"
      >
        <p className="font-semibold text-white text-xl">?</p>
      </div>
      <div
        className="absolute w-full h-[100svh] bg-black/10 z-10 transition-all animation-popup"
        style={{
          display: isShowing ? "block" : "none",
        }}
      >
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center h-[75svh] z-10">
          <div className="flex flex-col items-center py-3 px-6 bg-slate-50 rounded-xl shadow-xl ring-1 ring-slate-300">
            <h1 className="relative w-full text-2xl text-center font-semibold text-slate-900">
              Cara Bermain
              <div
                onClick={() => setisShowing(false)}
                className="absolute right-0 top-0 py-1 px-3 text-base text-white bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer transition-all"
              >
                Skip
              </div>
            </h1>
            <Image
              src={Gambar[step]}
              width={1000}
              height={1000}
              alt="Gambar"
              className="object-contain h-[50vh] w-full"
            />
            <p className="text-center ">{Penjelasan[step]}</p>
            <div className="py-4 flex flex-row justify-evenly w-full">
              {step < TOTAL_STEP ? (
                <>
                  <PrevStep
                    onclick={() => setStep((value) => value - 1)}
                    disabled={step == 0}
                  />
                  <NextStep
                    onclick={() => setStep((value) => value + 1)}
                    disabled={step == TOTAL_STEP}
                  />
                </>
              ) : (
                <MulaiBermain
                  onclick={() => {
                    setStep(0);
                    setisShowing(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutorial;
const MulaiBermain = ({ onclick, disabled }) => {
  return (
    <button
      className="bg-blue-500 ring-1 ring-blue-600 rounded-lg py-4 px-8 text-white hover:bg-blue-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
      onClick={onclick}
      disabled={disabled}
    >
      Mulai Bermain
    </button>
  );
};
const NextStep = ({ onclick, disabled }) => {
  return (
    <button
      className="bg-green-500 ring-1 ring-green-600 rounded-lg py-4 px-8 text-white hover:bg-green-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
      onClick={onclick}
      disabled={disabled}
    >
      Mengerti
    </button>
  );
};
const PrevStep = ({ onclick, disabled }) => {
  return (
    <button
      className="bg-red-500 ring-1 ring-red-600 rounded-lg py-4 px-8 text-white hover:bg-red-600 cursor-pointer transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
      onClick={onclick}
      disabled={disabled}
    >
      Kembali
    </button>
  );
};
