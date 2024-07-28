"use client";
import LokasiKotak from "@/app/components/LokasiKotak";
import React, { useEffect, useRef, useState } from "react";
import update from "immutability-helper";
import KotakSoal from "@/app/components/KotakSoal";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { snapToGrid } from "@/app/components/snapToGrid";
import Latex from "react-latex-next";
import useScreenSize from "@/app/utils/useScreenSize";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { getEquation, getEquationPenjabaran } from "../components/getEquation";
import DeleteButton from "../components/DeleteButton";
import Tutorial from "../components/Tutorial";

const styles = {
  width: "50%",
  height: "100%",
  border: "1px solid gray",
  position: "relative",
};

const LIST_SOAL = [
  "x^2 + 3x + 2",
  "x^2 + 5x + 6",
  "x^2 + 7x + 10",
  "x^2 + 8x + 12",
  "x^2 + 10x + 25",
];

const Playground = ({ isSnapToGrid }) => {
  const [result, setResult] = useState({});
  const [soal, setSoal] = useState(LIST_SOAL[0]);
  const [nomerSoal, setNomerSoal] = useState(1);
  const [kotak, setKotak] = useState({});
  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [bentuk, setBentuk] = useState("");
  const [akar_1, setAkar_1] = useState("");
  const [akar_2, setAkar_2] = useState("");
  const [statusJawaban, setStatusJawaban] = useState({
    type: "",
    isBenar: false,
  });
  const [showEmoticon, setShowEmoticon] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [isLongPress, setIsLongPress] = useState(null);
  const listKotak = {
    a: { title: "X^2", left: 112 + 0, top: 128 },
    b: { title: "X", left: 112 + 128 + 16, top: 128 },
    c: { title: "1", left: 112 + 128 + 64 + 32, top: 128 },
    d: { title: "-X", left: 112 + -64 - 16, top: 128 },
    e: { title: "-1", left: 112 + 128 + 64 + 64 + 48, top: 128 },
    f: { title: "X ", left: 112 + 128 + 64 * 4, top: 128 },
  };
  let audiohappy =
    typeof Audio != "undefined" ? new Audio("/audio/yay.mp3") : undefined;
  let audiosad =
    typeof Audio != "undefined" ? new Audio("/audio/sad.mp3") : undefined;
  useEffect(() => {
    setResult(getEquation(kotak));
  }, [kotak]);
  const checkAnswer = () => {
    if (
      getEquationPenjabaran(
        result.EqX,
        result.EqX2,
        result.EqConst,
        result.EqConst2
      ) == soal
    ) {
      setStatusJawaban({
        type: "bentuk",
        isBenar: true,
      });
      setShowEmoticon(true);
      audiohappy.play();
    } else {
      setStatusJawaban({
        type: "bentuk",
        isBenar: false,
      });
      setShowEmoticon(true);
      audiosad.play();
      setShowTryAgain(true);
    }
  };
  const checkPerhitungan = () => {
    const panjangString = `${result.EqX > 1 ? result.EqX : ""}x${
      result.EqConst > 0 ? `+${result.EqConst}` : result.EqConst
    }`;
    const lebarString = `${result.EqX2 > 1 ? result.EqX2 : ""}x${
      result.EqConst2 > 0 ? `+${result.EqConst2}` : result.EqConst2
    }`;
    const himpunanPenyelesaian1 =
      `${
        result.EqConst > 0
          ? "-" + result.EqConst
          : result.EqConst.toString().substring(1)
      }` + `${result.EqX > 1 ? `/${result.EqX}` : ""}`;
    const himpunanPenyelesaian2 =
      `${
        result.EqConst2 > 0
          ? "-" + result.EqConst2
          : result.EqConst2.toString().substring(1)
      }` + `${result.EqX2 > 1 ? `/${result.EqX2}` : ""}`;
    console.log(himpunanPenyelesaian1);
    console.log(himpunanPenyelesaian2);
    if (
      panjangString == panjang.toLowerCase() &&
      lebarString == lebar.toLowerCase()
    ) {
      if (
        himpunanPenyelesaian1 == akar_1.toLowerCase() &&
        himpunanPenyelesaian2 == akar_2.toLowerCase()
      ) {
        setStatusJawaban({
          type: "akar",
          isBenar: true,
        });
        audiohappy.play();
      } else {
        setStatusJawaban({
          type: "akar",
          isBenar: false,
        });
        audiosad.play();
        setShowTryAgain(true);
      }
      setShowEmoticon(true);
    } else {
      setStatusJawaban({
        type: "ukuran",
        isBenar: false,
      });
      setShowEmoticon(true);
      audiosad.play();
      setShowTryAgain(true);
    }
  };
  const tryAgain = () => {
    setShowEmoticon(false);
    if (statusJawaban.type == "bentuk") {
      // setKotak({});
    } else if (statusJawaban.type == "ukuran") {
      setPanjang("");
      setLebar("");
      setAkar_1("");
      setAkar_2("");
      setStatusJawaban({
        type: "bentuk",
        isBenar: true,
      });
    } else if (statusJawaban.type == "akar") {
      setAkar_1("");
      setAkar_2("");
      setStatusJawaban({
        type: "bentuk",
        isBenar: true,
      });
    }
    setShowTryAgain(false);
  };
  const soalSelanjutnya = () => {
    if (nomerSoal == LIST_SOAL.length) {
      alert("Kamu telah menyelesaikan semua soal");
    } else {
      setNomerSoal((value) => value + 1);
      setSoal(LIST_SOAL[nomerSoal]);
      reset();
    }
  };
  const soalSebelumnya = () => {
    if (nomerSoal == 1) {
      alert("ini soal pertama");
    } else {
      setNomerSoal((value) => value - 1);
      setSoal(LIST_SOAL[nomerSoal - 2]);
    }
  };
  const reset = () => {
    setShowEmoticon(false);
    setKotak({});
    setPanjang("");
    setLebar("");
    setAkar_1("");
    setAkar_2("");
    setStatusJawaban({
      type: "",
      isBenar: false,
    });
    setShowTryAgain(false);
    setBentuk("");
  };
  const addMultipleBox = (number, title, left, top) => {
    let newKotak = { ...kotak };
    for (let i = 1; i <= number; i++) {
      const id = (Math.random() * i).toString(36).substring(7) + i;
      newKotak[id] = {
        title,
        left: left + 64 + 16,
        top: top + 128,
      };
    }
    setKotak(newKotak);
  };
  useEffect(() => {
    if (isLongPress != null) {
      const prompt = window.prompt("please enter how many blocks you want");
      const number = parseInt(prompt, 10);
      if (prompt != null && number > 0) {
        addMultipleBox(
          number,
          isLongPress.title,
          isLongPress.left,
          isLongPress.top
        );
      }
    }
    setIsLongPress(null);
  }, [isLongPress]);
  useEffect(() => {
    if (showEmoticon) {
      setTimeout(() => {
        setShowEmoticon(false);
      }, 5000);
    }
  }, [showEmoticon]);
  const addbox = (id, title, left, top) => {
    setKotak(
      update(kotak, {
        [id]: {
          $set: { title, left, top },
        },
      })
    );
  };
  const moveBox = (id, left, top) => {
    setKotak(
      update(kotak, {
        [id]: {
          $merge: { left, top },
        },
      })
    );
  };
  const dropRef = useRef(null);
  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        setIsDrag(false);
        if (item && monitor && delta) {
          let left = Math.round(item.left + delta.x);
          let top = Math.round(item.top + delta.y);
          if (isSnapToGrid) {
            [left, top] = snapToGrid(left, top);
          }
          // Get the bounding rectangle of the drop area
          let dropAreaRect = null;
          if (dropRef.current) {
            dropAreaRect = dropRef.current.getBoundingClientRect();
          } else {
            // Handle the case when dropRef.current is null
            // For example, you can return from the function
            return;
          }
          // Check if the drop location is within the bounds of the drop area
          if (
            left < dropAreaRect.left ||
            top < dropAreaRect.top ||
            left > dropAreaRect.right ||
            top > dropAreaRect.bottom
          ) {
            // If not, return without calling addBox
            return;
          }
          moveBox(item.id, left, top);
          return undefined;
        }
      },
    }),
    [moveBox]
  );

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);
  const deleteBox = (id) => {
    setKotak((prevKotak) => {
      const newKotak = { ...prevKotak };
      delete newKotak[id];
      return newKotak;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-emerald-50  to-emerald-200 ">
      <div className="flex flex-col flex-1 justify-between ">
        <Tutorial />
        <div
          className="absolute flex flex-row gap-3 items-center text-black  duration-1000 -translate-y-1/2 transition-all"
          style={{
            top: "8rem",
            right: "10%",
          }}
        >
          <div className="mr-24 tracking-widest flex flex-col items-center gap-6">
            <p>No</p>
            <h1 className="text-4xl">
              <span>
                <button
                  className="text-black font-bold text-4xl mr-1"
                  onClick={() => soalSebelumnya()}
                >
                  {"<"}
                </button>
              </span>
              {nomerSoal} / {LIST_SOAL.length}
              <span>
                <button
                  className="text-black font-bold text-4xl ml-1"
                  onClick={() => soalSelanjutnya()}
                >
                  {">"}
                </button>
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="px-3 py-2 bg-white rounded-xl shadow-xl ring-1">
              Soal
            </div>
            <h1 className="text-3xl">
              <div
                className="bg-white rounded-lg px-3 py-1 ring-1 font-semibold
            "
              >
                <Latex>${soal}$</Latex>
              </div>
            </h1>
          </div>
        </div>
        <div
          ref={dropRef}
          style={styles}
          className="transition-all bg-white rounded-xl"
        >
          <div className="absolute text-black transition-all duration-1000 top-4 right-4">
            <button
              className="absolute py-3 px-10 top-0 right-0 bg-red-500 font-bold text-sm rounded-xl text-white cursor-pointer transition-all"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </button>
          </div>
          <DeleteButton onDelete={deleteBox} isDragging={isDrag} />
          <div
            className="absolute"
            style={{
              left: 0,
              top: 0,
            }}
          >
            {" "}
            <div className="relative">
              <div
                className="animate-popup"
                style={{
                  display: true ? "block" : "none",
                }}
              >
                <div className="absolute translate-y-24 translate-x-4 w-0.5 h-[22rem] bg-black"></div>
                <div className="absolute translate-y-24 translate-x-8 w-[4rem] h-[22rem] flex items-center text-black">
                  <div
                    className={`absolute -rotate-90 -translate-x-36 flex flex-row items-center justify-center gap-2 w-[22rem] h-[4rem] ${
                      statusJawaban.type == "ukuran" &&
                      !statusJawaban.isBenar &&
                      "text-red-500 text-xl font-bold"
                    }`}
                  >
                    <Latex>$lebar=$</Latex>
                    <Latex>${lebar} $</Latex>
                  </div>
                </div>
                <div className="absolute translate-x-24 translate-y-4 w-[28rem] h-0.5 bg-black"></div>
                <div className="absolute translate-y-8 translate-x-24 w-[28rem] text-black ">
                  <div
                    className={`w-full flex flex-row items-center justify-center  ${
                      statusJawaban.type == "ukuran" &&
                      !statusJawaban.isBenar &&
                      "text-red-500 text-xl font-bold"
                    }`}
                  >
                    <Latex>$panjang=$</Latex>
                    <Latex>${panjang} $</Latex>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(kotak).map((key) => (
            <KotakSoal
              key={key}
              id={key}
              {...kotak[key]}
              setIsDrag={setIsDrag}
            />
          ))}
        </div>
        <div
          className="absolute right-16 items-center h-full animate-popup"
          style={{
            display: true ? "flex" : "none",
            // pointerEvents:
            //   statusJawaban.type == "bentuk" && statusJawaban.isBenar == true
            //     ? "auto"
            //     : "none",
          }}
        >
          <div className="flex flex-row items-start gap-4  text-black">
            <div className="flex flex-col items-start gap-4">
              <div
                className="flex-col items-center gap-4"
                style={{
                  display: true ? "flex" : "none",
                }}
              >
                {/* <h1 className="text-2xl font-medium">Hasil</h1> */}
                <div className="flex item-centers gap-2">
                  <Latex>$ P = $</Latex>
                  <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                    <Latex>$ {panjang} $</Latex>
                    <input
                      type="text"
                      value={panjang}
                      className={`absolute left-0 top-0 px-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                        panjang.length > 0
                          ? "text-transparent w-fit tracking-widest text-2xl"
                          : "w-24"
                      }`}
                      onChange={(e) => setPanjang(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex item-centers gap-2">
                  <Latex>$ L = $</Latex>
                  <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                    <Latex>$ {lebar} $</Latex>
                    <input
                      type="text"
                      value={lebar}
                      className={`absolute left-0 top-0 px-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                        lebar.length > 0
                          ? "text-transparent w-fit tracking-widest text-2xl"
                          : "w-24"
                      }`}
                      onChange={(e) => setLebar(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <select
                onChange={(e) => setBentuk(e.target.value)}
                name="bentuk"
                id="bentuk"
                value={bentuk}
                className="p-2 bg-white rounded-lg ring-1 text-lg w-48"
              >
                <option value="" selected>
                  {" "}
                  pilih bentuk{" "}
                </option>
                <option value="persegi">persegi</option>
                <option value="persegi_panjang">persegi panjang</option>
              </select>
              <div
                className="items-center gap-2 font-medium animate-popup"
                style={{
                  display: bentuk != "" ? "flex" : "none",
                }}
              >
                Luas =
                <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                  <Latex>
                    $ {bentuk == "persegi" ? "sisi.sisi" : "panjang.lebar"} $
                  </Latex>
                </div>
              </div>
              <div
                className="items-center gap-2 animate-popup"
                style={{
                  display: bentuk != "" ? "flex" : "none",
                }}
              >
                0 =
                <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                  <Latex>
                    $ ({panjang})({lebar}) $
                  </Latex>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div
                className="flex-col items-start gap-4 animate-popup"
                style={{
                  display: bentuk != "" ? "flex" : "none",
                }}
              >
                {/* <h2 className="text-2xl font-medium">Akar</h2> */}
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-xl">
                    <Latex>$ {panjang} = 0 $</Latex>
                  </div>
                  <span className="text-2xl">
                    <Latex>$\vee$</Latex>
                  </span>
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-xl">
                    <Latex>$ {lebar} = 0 $</Latex>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex item-centers gap-2">
                    <Latex>$ x_{1} = $</Latex>
                    <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                      <Latex>$ {akar_1} $</Latex>
                      <input
                        type="text"
                        value={akar_1}
                        className={`absolute left-0 top-0 px-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                          akar_1.length > 0
                            ? "text-transparent w-fit tracking-widest text-2xl"
                            : "w-24"
                        }`}
                        onChange={(e) => setAkar_1(e.target.value)}
                      />
                    </div>
                  </div>
                  <span className="text-2xl">
                    <Latex>$\vee$</Latex>
                  </span>
                  <div className="flex item-centers gap-2">
                    <Latex>$ x_{2} = $</Latex>
                    <div className="relative bg-white rounded-lg w-24 h-10 px-3 py-1 ring-1 text-lg">
                      <Latex>$ {akar_2} $</Latex>
                      <input
                        type="text"
                        value={akar_2}
                        className={`absolute left-0 top-0 px-3 py-1 z-10 w-24 bg-transparent focus:outline-none ${
                          akar_2.length > 0
                            ? "text-transparent w-fit tracking-widest text-2xl"
                            : "w-24"
                        }`}
                        onChange={(e) => setAkar_2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex-cole items-center gap-4 animate-popup"
                style={{
                  display: bentuk != "" ? "flex" : "none",
                }}
              >
                <Latex>
                  $ Hp = $ {"{"}$ {akar_1}
                  {akar_2 ? "," : ""}
                  {akar_2} $ {"}"}
                </Latex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-48 pl-48 w-full flex justify-start bg-slate-300 text-black">
        <div className="w-[300px] mt-8 -translate-y-32 -translate-x-32">
          {Object.keys(listKotak).map((key) => (
            <LokasiKotak
              key={key}
              setLongPress={setIsLongPress}
              id={key}
              {...listKotak[key]}
              onClick={() =>
                addbox(
                  Math.random().toString(36).substring(7),
                  listKotak[key].title,
                  listKotak[key].left,
                  listKotak[key].top
                )
              }
            />
          ))}
        </div>
        {showEmoticon && (
          <div className="absolute top-8 right-96 rounded-xl text-white cursor-pointer transition-all disabled:bg-grey-400 disabled:cursor-not-allowed">
            <div className="relative ">
              {statusJawaban.isBenar == false && (
                <div className="absolute -top-32 right-0 p-3 h-fit w-64 rounded-lg text-lg ring-1 ring-slate-300 bg-white text-black animate-popup transition-all">
                  {statusJawaban.type == "bentuk"
                    ? "bentuk yang kamu buat masih salah, coba ulang kembali"
                    : statusJawaban.type == "ukuran"
                    ? "panjang atau lebar masih salah coba hitung kembali"
                    : "himpunan penyelesaian masih salah, coba hitung kembali"}
                </div>
              )}
              {statusJawaban.isBenar == true && (
                <div className="absolute -top-32 right-0 p-3 h-fit w-64 rounded-lg text-lg ring-1 ring-slate-300 bg-white text-black animate-popup transition-all">
                  {statusJawaban.type == "bentuk"
                    ? "Kerja Bagus, bentuk yang kamu buat sudah benar, sekarang hitung panjang dan lebarnya"
                    : statusJawaban.type == "akar" &&
                      "Kerja bagus, himpunan penyelesaian sudah benar, sekarang lanjut soal selanjutnya"}
                </div>
              )}
            </div>
            <div className="font-bold text-6xl animate-popup transition-all">
              {statusJawaban.isBenar ? "🤩" : "😭"}
            </div>
          </div>
        )}
        {statusJawaban.isBenar == true ? (
          statusJawaban.type == "akar" ? (
            <button
              className="absolute bg-blue-400 rounded-xl py-6 px-12 right-32 top-8 text-white hover:bg-blue-500 cursor pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
              onClick={() => {
                soalSelanjutnya();
              }}
            >
              {nomerSoal == LIST_SOAL.length ? "Selesai" : "lanjut"}
            </button>
          ) : (
            <button
              className="absolute bg-yellow-400 rounded-xl py-6 px-12 right-32 top-8 text-white hover:bg-yellow-500 cursor pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
              onClick={() => {
                checkPerhitungan();
              }}
            >
              Check Hasil
            </button>
          )
        ) : showTryAgain ? (
          <button
            className="absolute bg-red-400 rounded-xl py-6 px-12 right-32 top-8 text-white hover:bg-red-500 cursor pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
            onClick={() => {
              tryAgain();
            }}
          >
            Cobalagi
          </button>
        ) : (
          <button
            className="absolute bg-green-400 rounded-xl py-6 px-12 right-32 top-8 text-white hover:bg-green-500 cursor pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
            onClick={() => {
              checkAnswer();
            }}
            disabled={Object.keys(kotak).length < 1}
          >
            Check Bentuk
          </button>
        )}
      </div>
    </div>
  );
};

export default Playground;
