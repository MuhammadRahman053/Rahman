"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative h-[50svh]">
        <Image
          src={"/hero.jpeg"}
          alt="hero"
          width={1000}
          height={1000}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute flex flex-col gap-6 justify-center items-center w-screen h-full top-0 text-white">
          <h1 className="text-6xl tracking-wider font-extrabold drop-shadow-xl">
            Website Blok Aljabar
          </h1>
          <Link href={"/simulasi"} className="no-underline text-white">
            <button className="ring-2 text-xl font-medium ring-blue-400 rounded-2xl px-6 py-3 bg-black/50 hover:bg-blue-400 transition-all backdrop-blur-md">
              COBA SEKARANG
            </button>
          </Link>
        </div>
      </div>
      <div className="relative h-[50svh] flex justify-evenly items-center flex-wrap p-6 gap-6">
        <Card
          variant="red"
          href="/tujuan"
          title="Tujuan Pembelajaran"
          image="/Icon Tujuan Pembelajaran.png"
        />
        <Card
          variant="green"
          href="/simulasi"
          title="Simulasi"
          image="/Icon Simulasi 1 .png"
        />
        <Card variant="yellow" href="/soal" title="Soal" image="/Paper.svg" />
        <Card
          variant="blue"
          href="/pembuat"
          title="Pembuat"
          image="/Icon Pembuat.png"
        />
      </div>
    </>
  );
}

const Card = ({ title, image, href, variant }) => {
  const color =
    variant == "red"
      ? "bg-red-200"
      : variant == "green"
      ? "bg-green-200"
      : variant == "yellow"
      ? "bg-yellow-200"
      : variant == "blue"
      ? "bg-blue-200"
      : "";
  return (
    <Link
      href={href}
      className={`${color} p-8 px-12 w-64 h-64 rounded-full flex flex-col items-center justify-center gap-8 hover:brightness-105 hover:scale-105 transition-all`}
    >
      <p className="font-medium text-2xl text-black max-w-[10ch] text-center">
        {title}
      </p>
      <Image src={image} width={64} height={64} className="object-contain" />
    </Link>
  );
};
