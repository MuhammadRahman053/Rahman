"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openTujuan, setOpenTujuan] = useState(false);
  const [isLanguageOpen, setIslanguageOpen] = useState(false);
  const [theme, setheme] = useState("light");
  const router = useRouter();
  console.log({ isDropdownOpen });
  const themetoggle = () => {
    if (theme == "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      // languageicon.setAttribute("class","invers");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      // languageicon.setAttribute("class","");
    }
  };

  const changeTheme = (checked) => {
    setheme(checked ? "dark" : "light");
    themetoggle();
  };
  const openLink = (link) => {
    router.push(link);
    setOpenTujuan(false);
  };
  return (
    <>
      <nav>
        <a href="/" className="flex gap-3 items-center">
          <img src="/Block Aljabar.png" width="50" height="50" />
        </a>

        <ul class="menu">
          <li className="relative">
            <div
              className="flex item-center gap-1 font-semibold "
              onClick={() => setOpenTujuan((value) => !value)}
            >
              <Image
                src={"/Icon Tujuan Pembelajaran.png"}
                alt="paper"
                width={30}
                height={30}
                className="invert"
              />
              Tujuan pembelajaran
            </div>
            <div
              className={`absolute top-12 z-10 w-36 bg-black rounded-xl ${
                openTujuan ? "" : "hilang"
              }`}
            >
              <div
                className="py-2 px-4 hover:bg-white/20 rounded-lg transition-all flex items-center"
                onClick={() => openLink("/tujuan_pembelajaran/lkpd")}
              >
                LKPD
              </div>
              <div
                className="py-2 px-4 hover:bg-white/20 rounded-lg transition-all flex items-center"
                onClick={() => openLink("/tujuan_pembelajaran/modulajar")}
              >
                Modul Ajar
              </div>
              <div
                className="py-2 px-4 hover:bg-white/20 rounded-lg transition-all flex items-center"
                onClick={() => openLink("/tujuan_pembelajaran/ppt")}
              >
                PPT
              </div>
            </div>
          </li>
          <li>
            <Link
              href={"/simulasi"}
              className="flex items-center gap-1 font-semibold "
            >
              <Image
                src={"/Icon Simulasi.png"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Simulasi
            </Link>
          </li>
          <li>
            <Link
              href={"/soal"}
              className="flex items-center gap-1 font-semibold"
            >
              <Image
                src={"/Paper.svg"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Soal
            </Link>
          </li>
          <li>
            <Link
              href={"/pembuat"}
              className="flex items-center gap-1 font-semibold"
            >
              <Image
                src={"/Icon Pembuat.png"}
                alt="paper"
                width={24}
                height={24}
                className="invert"
              />
              Pembuat
            </Link>
          </li>
        </ul>

        <div class="setting">
          <div
            class={`Dropdown z-10 ${isDropdownOpen ? "" : "hilang"}`}
            id="dropdown"
          >
            <Link href="/masuk" class="Dropdown-Menu">
              <img src="./Masuk .png" />
              <p> Masuk </p>
            </Link>
            <Link href="/signup" class="Dropdown-Menu">
              <img src="./Profile.png" width="26" />
              <p>Buat Akun Baru </p>
            </Link>
            <div class="Dropdown-Menu">
              <img src="./Mode Gelap.png" width="26" />
              Mode Gelap
              <form action="">
                {/* <!-- Rounded switch --> */}
                <label class="switch">
                  <input
                    type="checkbox"
                    name="theme"
                    onChange={(e) => changeTheme(e.target.checked)}
                  />
                  <span class="slider round"></span>
                </label>
              </form>
            </div>
            <div
              class="Dropdown-Menu"
              id="GantiBahasa"
              onClick={() => setIslanguageOpen(true)}
            >
              <img src="./Ganti Bahasa .png " width="26" />
              Ganti Bahasa
              <img
                src="/Bendera.png"
                alt="Logo Bendera"
                width="30"
                id="current-language-icon"
              />
            </div>
          </div>
          <div
            id="setting-button"
            onClick={() => setDropdownOpen((value) => !value)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(10.66667,10.66667)">
                  <path d="M9.66602,2l-0.49023,2.52344c-0.82417,0.31082 -1.58099,0.74649 -2.24414,1.29102l-2.42383,-0.83594l-2.33594,4.04297l1.94141,1.6875c-0.07463,0.45823 -0.11328,0.88286 -0.11328,1.29102c0,0.40877 0.03981,0.83263 0.11328,1.29102v0.00195l-1.94141,1.6875l2.33594,4.04102l2.42188,-0.83398c0.66321,0.54482 1.42175,0.97807 2.24609,1.28906l0.49023,2.52344h4.66797l0.49024,-2.52344c0.82471,-0.31102 1.58068,-0.74599 2.24414,-1.29102l2.42383,0.83594l2.33398,-4.04102l-1.93945,-1.68945c0.07463,-0.45823 0.11328,-0.88286 0.11328,-1.29102c0,-0.40754 -0.03887,-0.83163 -0.11328,-1.28906v-0.00195l1.94141,-1.68945l-2.33594,-4.04102l-2.42188,0.83398c-0.66321,-0.54482 -1.42175,-0.97807 -2.24609,-1.28906l-0.49024,-2.52344zM11.31445,4h1.37109l0.38867,2l1.04297,0.39453c0.62866,0.23694 1.19348,0.56222 1.68359,0.96484l0.86328,0.70703l1.92188,-0.66016l0.68555,1.18555l-1.53516,1.33594l0.17578,1.09961v0.00195c0.06115,0.37494 0.08789,0.68947 0.08789,0.9707c0,0.28123 -0.02674,0.59572 -0.08789,0.9707l-0.17773,1.09961l1.53516,1.33594l-0.68555,1.1875l-1.91992,-0.66211l-0.86523,0.70898c-0.49011,0.40262 -1.05298,0.7279 -1.68164,0.96484h-0.00195l-1.04297,0.39453l-0.38867,2h-1.36914l-0.38867,-2l-1.04297,-0.39453c-0.62867,-0.23694 -1.19348,-0.56222 -1.68359,-0.96484l-0.86328,-0.70703l-1.92187,0.66016l-0.68555,-1.18555l1.53711,-1.33789l-0.17773,-1.0957v-0.00195c-0.06027,-0.37657 -0.08789,-0.69198 -0.08789,-0.97266c0,-0.28123 0.02674,-0.59572 0.08789,-0.9707l0.17773,-1.09961l-1.53711,-1.33594l0.68555,-1.1875l1.92188,0.66211l0.86328,-0.70898c0.49011,-0.40262 1.05493,-0.7279 1.68359,-0.96484l1.04297,-0.39453zM12,8c-2.19652,0 -4,1.80348 -4,4c0,2.19652 1.80348,4 4,4c2.19652,0 4,-1.80348 4,-4c0,-2.19652 -1.80348,-4 -4,-4zM12,10c1.11148,0 2,0.88852 2,2c0,1.11148 -0.88852,2 -2,2c-1.11148,0 -2,-0.88852 -2,-2c0,-1.11148 0.88852,-2 2,-2z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </nav>
      <div
        class={`pilihan_bahasa ${isLanguageOpen ? "" : "hilang"}`}
        id="pilihan_bahasa"
      >
        <div id="close-bahasa" onClick={() => setIslanguageOpen(false)}>
          X
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="./Ganti Bahasa .png"
            alt="Ganti Bahasa"
            width="30"
            id="Language-icon"
            className={`${theme == "light" ? "" : "invers"}`}
          />
          <h1>GANTI BAHASA</h1>
        </div>
        <div>
          <div class="Bahasa" id="bahasa-indonesia">
            <img src="./Bendera.png" width="30" height="30" />
            <p>Bahasa Indonesia</p>
          </div>
          <div class="Bahasa" id="bahasa-inggris">
            <img src="./Bahasa Inggris .png" width="30" height="30" />
            <p>Bahasa English</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
