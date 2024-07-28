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
import { SimulasiSelanjutnya } from "@/app/components/NavigasiSoal";
import TutorialSimulasi from "@/app/components/TutorialSimulasi";

const styles = {
  width: "100%",
  height: "100%",
  border: "1px solid gray",
  position: "relative",
};
const NORMAL_BOX_WIDTH = 64;
const BIG_BOX_WIDTH = 2 * NORMAL_BOX_WIDTH;
const BOX_TOP = 192;
const GAP = 32;
const TOTAL_STEP = 14;

const Playground = ({ isSnapToGrid }) => {
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(false);
  const [previewPL, setPreviewPL] = useState(false);
  const [previewHasil, setPreviewHasil] = useState({
    display: false,
    step: 0,
  });
  const [kotak, setKotak] = useState({});
  const listKotak = {
    a: { title: "X", left: 64 + 16, top: 0 },
    b: { title: "1", left: 64 + 64 + 32, top: 0 },
    c: { title: "-X", left: 0, top: 0 },
    d: { title: "-1", left: 64 * 3 + 48, top: 0 },
  };
  const screenSize = useScreenSize();
  let BOX_LEFT =
    Math.round(screenSize.width / 2 / 32) * 32 -
    (BIG_BOX_WIDTH + NORMAL_BOX_WIDTH) / 2;
  const kondisiPerStep = (step) => {
    const INITIAL_LEFT = BOX_LEFT - BIG_BOX_WIDTH * 4;
    if (step == 1) {
      setKotak({});
    }
    if (step == 2) {
      addbox("1", "X", INITIAL_LEFT, BOX_TOP);
    } else if (step == 3) {
      addbox("2", "X", INITIAL_LEFT + NORMAL_BOX_WIDTH + GAP, BOX_TOP);
    } else if (step == 4) {
      addbox("3", "X", INITIAL_LEFT + NORMAL_BOX_WIDTH * 2 + GAP * 2, BOX_TOP);
    } else if (step == 5) {
      addbox("4", "-1", INITIAL_LEFT + NORMAL_BOX_WIDTH * 3 + GAP * 3, BOX_TOP);
    } else if (step == 6) {
      addbox("5", "-X", INITIAL_LEFT + NORMAL_BOX_WIDTH * 4 + GAP * 4, BOX_TOP);
    } else if (step == 7) {
      addbox("6", "-X", INITIAL_LEFT + NORMAL_BOX_WIDTH * 5 + GAP * 5, BOX_TOP);
    } else if (step == 8) {
      addbox("7", "1", INITIAL_LEFT + NORMAL_BOX_WIDTH * 6 + GAP * 6, BOX_TOP);
    } else if (step == 9) {
      addbox("8", "1", INITIAL_LEFT + NORMAL_BOX_WIDTH * 7 + GAP * 7, BOX_TOP);
    } else if (step == 10) {
      addbox("9", "1", INITIAL_LEFT + NORMAL_BOX_WIDTH * 8 + GAP * 8, BOX_TOP);
    } else if (step == 11) {
      addbox("10", "1", INITIAL_LEFT + NORMAL_BOX_WIDTH * 9 + GAP * 9, BOX_TOP);
    }
    if (step >= 12) {
      setKotak((prev) => ({
        ...kotak,
        [4]: {
          ...prev[4],
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 5 + GAP * 5,
          top: BOX_TOP,
        },
        [5]: {
          ...prev[5],
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 3 + GAP * 3,
          top: BOX_TOP,
        },
        [6]: {
          ...prev[6],
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 4 + GAP * 4,
          top: BOX_TOP,
        },
      }));
    }
    if (step >= 14) {
      setKotak((prev) => ({
        [1]: {
          ...prev[1],
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 4 + GAP * 4,
          top: BOX_TOP,
        },
        [2]: {
          title: "1",
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 5 + GAP * 5,
          top: BOX_TOP,
        },
        [3]: {
          title: "1",
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 6 + GAP * 6,
          top: BOX_TOP,
        },
        [4]: {
          title: "1",
          left: INITIAL_LEFT + NORMAL_BOX_WIDTH * 7 + GAP * 7,
          top: BOX_TOP,
        },
      }));
    }
  };
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
      },
    }),
    [moveBox]
  );

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div className="flex flex-col h-screen">
      <TutorialSimulasi />
      <div className="flex flex-col flex-1 justify-between bg-white">
        <div
          className="absolute flex flex-col gap-3 items-center text-black bg-white  duration-1000 -translate-y-1/2 transition-all"
          style={{
            top: step > 0 ? "4rem" : "50%",
            transform: previewHasil.display
              ? "translateX(0) translateY(25%)"
              : "translateX(-50%) translateY(50%)",
            left: previewHasil.display ? "20%" : "50%",
          }}
        >
          <div className="px-3 py-2 rounded-xl shadow-xl ring-1">Soal</div>
          <h1 className="text-3xl">
            <Latex>$3x - 1 - 2x + 4$</Latex>
          </h1>
        </div>
        <div ref={dropRef} style={styles}>
          <SimulasiSelanjutnya Babsekarang={1} />
          <div
            className="absolute z-10"
            style={{
              left: BOX_LEFT - BIG_BOX_WIDTH * 4,
              top: BOX_TOP,
            }}
          >
            {" "}
            <div
              className="relative animate-popup"
              style={{
                display: step == 13 ? "block" : "none",
              }}
            >
              <div
                className="w-1 h-52 bg-black absolute rotate-[-53deg] translate-x-20 -translate-y-10"
                style={{
                  left: NORMAL_BOX_WIDTH + GAP,
                }}
              ></div>
              <div
                className="w-1 h-52 bg-black absolute rotate-[-53deg] translate-x-20 -translate-y-10"
                style={{
                  left: NORMAL_BOX_WIDTH * 3 + GAP * 3,
                }}
              ></div>
              <div
                className="w-1 h-20 bg-black absolute rotate-[-45deg] translate-x-8 -translate-y-2"
                style={{
                  left: NORMAL_BOX_WIDTH * 5 + GAP * 5,
                }}
              ></div>
              <div
                className="w-1 h-20 bg-black absolute rotate-[-45deg] translate-x-8 -translate-y-2"
                style={{
                  left: NORMAL_BOX_WIDTH * 6 + GAP * 6,
                }}
              ></div>
            </div>
          </div>
          <div
            className="absolute text-black transition-all duration-1000"
            style={{
              left: step >= 9 ? BIG_BOX_WIDTH * 2 : BOX_LEFT,
              top: BOX_TOP,
            }}
          >
            <div
              className="relative animate-popup"
              style={{ display: preview ? "block" : "none" }}
            >
              <div className="relative">
                <div className="absolute -translate-y-8 w-[128px]">
                  <div className="w-full flex flex-col items-center justify-center">
                    <Latex>$x$</Latex>
                    <div className="bg-black translate-y-0 w-3/4 h-[1px]"></div>
                  </div>
                </div>
                <div className="absolute w-[64px] translate-x-[128px] -translate-y-8">
                  <div className="w-full flex flex-col items-center justify-center">
                    <Latex>$1$</Latex>
                    <div className="bg-black translate-y-0 w-3/4 h-[1px]"></div>
                  </div>
                </div>
                <div className="absolute translate-y-[128px] -translate-x-8 h-[64px] flex items-center">
                  <div className="-rotate-90">
                    <Latex>$1$</Latex>
                  </div>
                  <div className="bg-black translate-x-4 h-3/4 w-[1px]"></div>
                </div>
                <div className="absolute -translate-x-8 h-32 flex items-center">
                  <div className="-rotate-90">
                    <Latex>$x$</Latex>
                  </div>
                  <div className="bg-black translate-x-1 h-3/4 w-[1px]"></div>
                </div>
              </div>
            </div>
            <div
              className="relative animate-popup "
              style={{
                display: previewPL ? "block" : "none",
              }}
            >
              <div className="absolute -translate-y-8 w-[192px]">
                <div className="w-full flex flex-col items-center justify-center">
                  <Latex>$ P = x + 1 $</Latex>
                </div>
              </div>
              <div className="absolute -translate-x-16 h-48 flex items-center">
                <div className="-rotate-90 w-max">
                  <Latex>$ L = x + 1 $</Latex>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(kotak).map((key) => (
            <KotakSoal key={key} id={key} {...kotak[key]} />
          ))}
          <div
            className="absolute right-32 items-center h-full animate-popup"
            style={{
              display: "flex",
            }}
          >
            <div className="flex flex-row items-start gap-4 p-6 bg-slate-100 rounded-xl shadow-xl ring-1 ring-slate-300 text-black">
              <div className="flex flex-col items-start gap-4">
                <div
                  className="flex-col items-center gap-4"
                  style={{
                    display: "flex",
                  }}
                >
                  <h1 className="text-2xl font-medium">Hasil</h1>
                  <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                    <Latex>$ 3x - 1 + 2x + 4$</Latex>
                  </div>
                  {step >= 12 && (
                    <>
                      <Latex>$ \downarrow$</Latex>
                      <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                        <Latex>$ 3x - 2x - 1 + 4$</Latex>
                      </div>
                    </>
                  )}
                  {step >= 13 && (
                    <>
                      <Latex>$ \downarrow$</Latex>
                      <div className="bg-white rounded-lg px-3 py-1 ring-1 text-lg">
                        <Latex>$ x + 3$</Latex>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute left-48 top-40 items-center h-full animate-popup"
            style={{
              display: step == 13 ? "flex" : "none",
            }}
          >
            <div className="flex flex-row items-start gap-4 p-3 bg-slate-100 rounded-xl shadow-xl ring-1 ring-slate-300">
              <div className="flex flex-col items-center gap-4 ">
                <h1 className="text-xl font-bold text-black">Keterangan</h1>
                <p className="w-[28rem] text-sm text-justify text-black">
                  Dengan prinsip nol blok, karena blok x, blok -x, dan blok
                  satuan saling menghabiskan, maka blok yang tersisa adalah 1
                  blok x dan 3 blok satuan
                </p>
                <p className="font-bold italic text-black">
                  {"("}Prinsip Nol Blok{")"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-48 w-full flex justify-center bg-slate-300 text-black">
        <div className="w-[300px] mt-8">
          {Object.keys(listKotak).map((key) => (
            <LokasiKotak
              key={key}
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
        <button
          className="absolute bg-red-400 rounded-xl py-12 px-16 left-16 top-8 text-white hover:bg-red-500 cursor pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
          onClick={() => {
            kondisiPerStep();
            setStep((prev) => {
              kondisiPerStep(prev - 1);
              return prev - 1;
            });
          }}
          disabled={step == 0}
        >
          Prev
        </button>
        <button
          className="absolute bg-green-400 rounded-xl py-12 px-16 right-16 top-8 text-white hover:bg-green-500 cursor pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:ring-0"
          onClick={() => {
            kondisiPerStep();
            setStep((prev) => {
              kondisiPerStep(prev + 1);
              if (prev == TOTAL_STEP) {
                return TOTAL_STEP - 1;
              }
              return prev + 1;
            });
          }}
          disabled={step == TOTAL_STEP}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Playground;
