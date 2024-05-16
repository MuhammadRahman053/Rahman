import Image from "next/image";
import React from "react";

const Pembuat = () => {
  return (
    <div className="min-h-[90svh] px-12 flex xl:flex-row flex-col justify-around items-center">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <h1 className="text-6xl">
            Muhammad <span className="font-bold text-sky-600">Rahman</span>{" "}
            Prihadi
          </h1>
        </div>
        <a
          href="https://www.unesa.ac.id"
          target="_blank"
          className="py-3 px-6 rounded-lg flex items-center gap-8 bg-slate-900 hover:bg-slate-800 hover:scale-105 hover:shadow-xl w-fit shadow-lg transition-all"
        >
          <p className="text-base font-semibold tracking-wide text-white/90 ">
            University of Surabaya
          </p>
          <Image
            src={"/Logo.png"}
            alt="University"
            width={200}
            height={200}
            className="w-8 object-contain"
          />
        </a>
        <p className=" tracking-wide text-justify max-w-[1000px] text-lg">
          Hello, everyone! My name is Muhammad Rahman Prihadi, and I'm delighted
          to have this opportunity to introduce myself. I hail from the vibrant
          town of Jombang, located in the heart of East Java, Indonesia. Born on
          the 3rd of October 2002, I have spent most of my life in the serene
          surroundings of Desa Tegal Rejo, nestled within the Bareng
          sub-district of Jombang regency. Currently, at the age of 22, I am
          pursuing my higher education journey at Surabaya State University,
          where I am in the midst of my sixth semester. My academic pursuits
          align with my passion for mathematics and the natural sciences, as I
          am enrolled in the Faculty of Mathematics and Natural Sciences
          (FMIPA), majoring in Mathematics Education at the undergraduate level
          (S1).
        </p>
      </div>
      <div className="">
        <div className="relative bg-gradient-to-b from-[#0E749066] to-[#37415100] rounded-tl-full rounded-tr-full translate-y-8">
          <Image
            src={"/Foto_Rahman-removebg-preview (1).png"}
            alt="profile"
            width={1000}
            height={1000}
            className="m-3 w-[500px] -translate-y-16 "
            style={{
              filter: "drop-shadow(0 0 1rem rgba(0,0,0,0.25))",
            }}
          />
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <div className="absolute -right-[100px] -top-[100px] bg-[#fca5a580] w-[150px] h-[150px] rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Pembuat;
