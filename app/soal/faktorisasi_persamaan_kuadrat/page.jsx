"use client";
import LokasiKotak from "@/app/components/LokasiKotak";
import React, { useEffect, useRef, useState } from "react";
import update from "immutability-helper";
import KotakSoal from "@/app/components/KotakSoal";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Playground from "./Playground";

const SoalFaktorisasi = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
  return (
    <DndProvider backend={HTML5Backend}>
      <Playground isSnapToGrid={snapToGridAfterDrop} />
    </DndProvider>
  );
};

export default SoalFaktorisasi;
