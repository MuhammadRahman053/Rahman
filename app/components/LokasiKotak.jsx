import React, { useState } from "react";
import { Kotak } from "./Kotak";
const getStyles = (left, top, width, height) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkiTransform: transform,
    width,
    height,
  };
};
const LokasiKotak = (props) => {
  const { id, title, left, top, setLongPress } = props;
  const [longPressTimer, setLongPressTimer] = useState(0);
  const handleMouseDown = () => {
    setLongPressTimer(
      setTimeout(() => {
        setLongPress({ title, left, top });
      }, 800)
    );
  };
  const handleMouseUp = () => {
    clearTimeout(longPressTimer);
  };
  return (
    <div
      style={getStyles(left, top, 100, 100)}
      className="Flex Flex-col"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={props.onClick}
    >
      <Kotak title={title} />
    </div>
  );
};

export default LokasiKotak;
