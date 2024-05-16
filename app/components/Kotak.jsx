import React from "react";
import Latex from "react-latex-next";

const styles = {
  border: `1px dashed gray`,
  padding: `0.5rem 1rem`,
  cursor: `move`,
};

export const Kotak = ({ title }) => {
  let width = 0;
  let height = 0;
  let backgroundColor = "";
  if (title == "X^2") {
    width = 4;
    height = 4;
    backgroundColor = "bg-blue-600";
  } else if (title == "X") {
    width = 2;
    height = 4;
    backgroundColor = "bg-green-600";
  } else if (title == "1") {
    width = 2;
    height = 2;
    backgroundColor = "bg-yellow-500";
  } else if (title == "X ") {
    width = 4;
    height = 2;
    backgroundColor = "bg-green-600";
  } else if (title == "-X") {
    width = 2;
    height = 4;
    backgroundColor = "bg-red-600";
  } else if (title == "-X ") {
    width = 2;
    height = 2;
    backgroundColor = "bg-red-500";
  } else if (title == "-1") {
    width = 2;
    height = 2;
    backgroundColor = "bg-red-600";
  }

  const widthFromSize = `${width * 2}rem`;
  const heightFromSize = `${height * 2}rem`;
  return (
    <div
      className={`flex flex-col animate-popup text-white font-bold items-center justify-center ${backgroundColor}`}
      style={{
        ...styles,
        width: widthFromSize,
        height: heightFromSize,
        display: !title && "none",
      }}
    >
      <Latex>${title ? title.toLowerCase() : null}$</Latex>
    </div>
  );
};
