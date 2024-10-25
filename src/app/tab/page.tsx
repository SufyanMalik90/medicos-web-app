'use client'

import React, { useContext, useState, useRef } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import { MdKeyboardArrowDown } from "react-icons/md";
import ProcessContainer from "@/components/ProcessContainer";
import Link from "next/link";

const Process = () => {
//   const { palette, theme } = useContext<any>(GlobalContext);
  const [openedTab, setOpenedTab] = useState(1);

  return (
    // <div
    //   id="process"
    //   className={` w-full py-10`}
    //   style={{ background: palette?.dark_contrast_background }}
    // >
      <div className={`px-4 md:px-12 lg:px-28 flex flex-col items-center justify-start`}>
        <div className={`w-full px-0 flex flex-col justify-between items-start`}>
          <p className={`text-xl font-bold text-[#8F8F8F] uppercase `}>
            6 step agile process
          </p>
          <h1
            className={`lg:font-bold uppercase font-extrabold text-4xl lg:text-6xl`}
          >
            our process
          </h1>
        </div>
        <div className="w-full h-auto mt-6 lg:my-6 grid grid-cols-3 grid-rows-1">
          <button
            type="button"
            name="open-tab"
            onClick={() => setOpenedTab(1)}
            className={`w-full font-medium text-md lg:text-lg gap-1 lg:gap-3 transition-all duration-300 h-16  border-b-2  ${openedTab == 1
              ? "border-[#F15C20] text-[#f15c20]"
              : "border-[#B4B4B4]/[0.5] text-[#b4b4b4]"
              } focus:border-[#F15C20] capitalize flex items-center justify-start lg:px-3`}
          >
            <span
              className={`w-7 h-7 lg:w-9 lg:h-9  rounded-full flex justify-center items-center   ${openedTab == 1
                ? "bg-[#F15C20]/[0.08] -rotate-0"
                : "bg-black"
                // theme == "light" ? "bg-[#E7E7E7] -rotate-90" : "bg-[#1c1c1c] -rotate-90"
                }`}
            >
              {/* <MdKeyboardArrowDown className="text-2xl" /> */}
            </span>
            <h1>agile</h1>
          </button>
          <button
            type="button"
            name="open-tab"
            onClick={() => setOpenedTab(2)}
            className={`w-full font-medium text-md lg:text-lg gap-1 lg:gap-3 transition-all duration-300 h-16  border-b-2  ${openedTab == 2
              ? "border-[#F15C20] text-[#f15c20]"
              : "border-[#B4B4B4]/[0.5] text-[#b4b4b4]"
              } focus:border-[#F15C20] capitalize flex items-center justify-start lg:px-3`}
          >
            <span
              className={`w-7 h-7 lg:w-9 lg:h-9  rounded-full flex justify-center items-center   ${openedTab == 2
                ? "bg-[#F15C20]/[0.08] -rotate-0"
                : "bg-black"
                // theme == "light" ? "bg-[#E7E7E7] -rotate-90" : "bg-[#1c1c1c] -rotate-90"
                }`}
            >
              {/* <MdKeyboardArrowDown className="text-2xl" /> */}
            </span>
            <h1>waterfall</h1>
          </button>
          <button
            type="button"
            name="open-tab"
            onClick={() => setOpenedTab(3)}
            className={`w-full font-medium text-md lg:text-lg gap-1 lg:gap-3 transition-all duration-300 h-16  border-b-2  ${openedTab == 3
              ? "border-[#F15C20] text-[#f15c20]"
              : "border-[#B4B4B4]/[0.5] text-[#b4b4b4]"
              } focus:border-[#F15C20] capitalize flex items-center justify-start lg:px-3`}
          >
            <span
              className={`w-7 h-7 lg:w-9 lg:h-9  rounded-full flex justify-center items-center   ${openedTab == 3
                ? "bg-[#F15C20]/[0.08] -rotate-0"
                : "bg-black"
                // theme == "light" ? "bg-[#E7E7E7] -rotate-90" : "bg-[#1c1c1c] -rotate-90"
                }`}
            >
              {/* <MdKeyboardArrowDown className="text-2xl" /> */}
            </span>
            <h1>hybrid</h1>
          </button>
        </div>

        <ProcessContainer openedTab={openedTab} />
        {/* <Link
          href="/contact-us"
          name="start-your-project"
          style={{
            background: palette?.brandOrange,
            color: "white",
          }}
          className="orange w-[150px] lg:w-[206px] h-14 lg:h-20 rounded-full transition-all duration-150 hover:opacity-90  shadow-xl text-sm lg:text-lg font-medium shadow-[#F15C20]/[0.3] flex items-center justify-center"
        >
          Start Your Project
        </Link> */}
      </div>
    // </div>
  );
};

export default Process;
