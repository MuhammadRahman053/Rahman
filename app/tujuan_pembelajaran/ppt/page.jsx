import React from "react";

const PPT = () => {
  return (
    <div className="flex flex-col flex-1 p-3 bg-slate-200 ">
      <h1 className="mb-3 text-2xl font-semibold text-center text-black">
        {" "}
        PPT
      </h1>
      <div className="flex flex-1 ">
        <iframe
          src="/aset/ppt_persamaan.pdf"
          frameborder="0"
          title="lkpd"
          width={300}
          height={200}
          className="w-full h-auto rounded-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default PPT;
