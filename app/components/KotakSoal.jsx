import React, { useEffect, useState } from "react";
import { Kotak } from "./Kotak";
import { useDrag, useDragDropManager } from "react-dnd";
const getStyles = (left, top, isDragging) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkiTransform: transform,
    opacity: isDragging ? 0.2 : 1,
  };
};
const KotakSoal = (props) => {
  const { id, title, left, top, setIsDrag } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [collected, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title]
  );
  useEffect(() => {
    if (setIsDrag != undefined) setIsDrag(isDragging);
  }, [isDragging]);
  useEffect(() => {
    setIsDragging(collected.isDragging);
  }, [collected]);
  return (
    <div
      ref={drag}
      style={getStyles(left, top, collected.isDragging)}
      className="transition-all duration-1000"
    >
      <Kotak title={title} />
    </div>
  );
};

export default KotakSoal;
