'use client'

// import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext, useRef } from "react";
import AgileProcess from "./AgileProcess";
import HybridProcess from "./HybridProcess";
import WaterfallProcess from "./WaterfallProcess";

const ProcessContainer = ({ openedTab }) => {
  // const { palette } = useContext(GlobalContext)
  return (

    openedTab == 1 ?
      <AgileProcess />
      : openedTab == 2 ?
        <WaterfallProcess />
        :
        <HybridProcess />
  );
};

export default ProcessContainer;
