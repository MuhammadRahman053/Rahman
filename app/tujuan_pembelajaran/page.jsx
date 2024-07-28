import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="w-full h-96 bg-[url('/DashboardBackground.jpg')]">
        <div className="flex h-full items-center justify-center flex-col gap-4 bg-black/50">
          <img
            src="/Icon Tujuan Pembelajaran.png"
            width={150}
            alt=""
            className="rounded-full invert"
          />
          <div className="text-white">
            <h1 className="text-5xl font-semibold drop-shadow-sm">
              Tujuan Pembelajaran
            </h1>
          </div>
        </div>
      </div>
      <div className="relative h-[50svh] w-full flex justify-evenly items-center flex-wrap p-6 gap-6">
        <Card
          variant="green"
          href="/tujuan_pembelajaran/modulajar"
          title="Modul Ajar"
          image="/Modul Ajar.png"
        />
        <Card
          variant="yellow"
          href="/tujuan_pembelajaran/lkpd"
          title="LKPD"
          image="/LKPD.png"
        />
        <Card
          variant="blue"
          href="/tujuan_pembelajaran/ppt"
          title="PPT"
          image="/PPT.png"
        />
      </div>
    </div>
  );
};

export default page;
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
      className={`p-8 px-12 w-64 h-64 rounded-full flex flex-col items-center justify-center gap-8 hover:brightness-105 hover:scale-105 transition-all`}
    >
      <p className="font-bold text-2xl text-black max-w-[10ch] text-center">
        {title}
      </p>
      <Image src={image} width={256} height={256} className="object-contain" />
    </Link>
  );
};
