import Image from "next/image";
import React, { useState } from "react";
const TOTAL_STEP = 3;
const Penjelasan = [
  "Klik tombol next pada layar untuk melihat simulasi penyelesaian soal persamaan kuadrat menggunakan blok aljabar .",
  "Anda dapat menekan tombol prev pada layar untuk kembali jika pada saat anda melihat simulasi ingin mengulangi step by step  ",
  "Anda dapat menekan tombol simulasi selanjutnya untuk melihat materi berikutnya ",
  "Anda juga dapat menekan simulasi sebelumnya jika anda ingin melihat kembali materi sebelumnya",
];
const Gambar = [
  "/Tutorialsimulasi1.png",
  "/Tutorialsimulasi2.png",
  "/Tutorialsimulasi3.png",
  "/Tutorialsimulasi4.png",
];
const TutorialSimulasi = () => {
  const [step, setStep] = useState(0);
  const [isShowing, setisShowing] = useState(true);
  return (
    <>
      <div
        onClick={() => setisShowing(true)}
        className="absolute right-96 top-20 w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 shadow-lg ring-2 ring-black/20 border-4 border-white cursor-pointer hover:scale-110 transition-all z-20"
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

export default TutorialSimulasi;
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
