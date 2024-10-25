"use client";
// import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext } from "react";

const HybridProcess = () => {
  // const { palette } = useContext(GlobalContext);
  return (
    <>
      <div className="w-full my-6 px-2 lg:px-10 h-auto hidden lg:flex flex-col lg:flex-row gap-0 lg:gap-10 justify-start items-start">
        <div className=" w-full lg:w-[49%] h-auto grid grid-rows-3 grid-cols-1 gap-3">
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
            <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              01.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Analysis
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              The analysis stage encompasses gathering requirements and conducting feasibility studies. It involves a blend of detailed planning and research to define project objectives and assess potential challenges. Stakeholder input and market analysis contribute to shaping a comprehensive strategy for development.

            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
            <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              03.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            UI Designing
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              It transforms wireframes into visually appealing and user-friendly interfaces. Design elements are meticulously crafted to enhance usability and brand identity while aligning with project objectives. 
            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto flex flex-col justify-center items-start  py-10 gap-3">
            <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] text-[70px] lg:text-[100px] group-hover:text-[#F15C20] font-bold leading-[4.5rem]">
              05.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Evaluation
            </h2>
            
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              This ensures the applications reliability, and adherence to requirements. Various evaluation methods, including unit, integration, and user acceptance testing, are employed to validate the softwares performance. 
            </p> */}
          </div>
        </div>
        <div className="hidden lg:grid w-auto h-[80rem]   grid-rows-5 grid-cols-1 justify-center items-start">
          <span className=" h-full  flex flex-col justify-start items-center">
            {/* <span
              className=" w-6 h-6 rounded-full   flex items-center justify-center"
              style={{ background: palette?.color }}
            >
              <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span>
            </span> */}
            {/* <span
              className="h-[calc(100%-3rem)] w-[2px] "
              style={{ background: palette?.color }}
            ></span>
            <span
              className=" w-6 h-6 rounded-full   flex items-center justify-center"
              style={{ background: palette?.color }}
            >
              <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span>
            </span> */}
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
        </div>
        <div className="w-full lg:w-[49%] h-auto lg:mt-44 grid grid-rows-3 grid-cols-1 gap-3">
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
            <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              02.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Wireframes
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              Wireframing involves creating skeletal frameworks to visualize the apps layout and functionality. These wireframes serve as a blueprint, guiding both design and development teams.  
            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
            <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              04.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Coding
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              Coding involves the development of both client-facing and server-side components. Front-end coding focuses on implementing the user interface with attention to design and user experience. Simultaneously, back-end coding addresses server logic, database management, and system integration to enable functionality with ease.
            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto flex flex-col justify-center items-start  py-10 gap-3">
            <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              06.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Deployment
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              The final step involves releasing the application to production environments. It includes activities such as packaging, configuring, and deploying the software to servers or app stores. Thorough testing and stakeholder approval precede deployment, enabling a smooth transition to the live environment.

            </p> */}
          </div>
        </div>
      </div>
      <div className="w-full my-6 px-2 lg:px-10 h-auto lg:hidden flex flex-col lg:flex-row gap-0 lg:gap-10 justify-start items-start">
        <div className=" w-full lg:w-[49%] h-auto grid grid-rows-3 grid-cols-1 gap-3">
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
          <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              01.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Analysis
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              The analysis stage encompasses gathering requirements and conducting feasibility studies. It involves a blend of detailed planning and research to define project objectives and assess potential challenges. Stakeholder input and market analysis contribute to shaping a comprehensive strategy for development.

            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
          <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              02.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Wireframes
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              Wireframing involves creating skeletal frameworks to visualize the apps layout and functionality. These wireframes serve as a blueprint, guiding both design and development teams.  
            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
          <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              03.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            UI Designing
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              It transforms wireframes into visually appealing and user-friendly interfaces. Design elements are meticulously crafted to enhance usability and brand identity while aligning with project objectives. 
            </p> */}
          </div>
        </div>
        <div className="hidden lg:grid w-auto h-[80rem]   grid-rows-5 grid-cols-1 justify-center items-start">
          <span className=" h-full  flex flex-col justify-start items-center">
            {/* <span
              className=" w-6 h-6 rounded-full   flex items-center justify-center"
              style={{ background: palette?.color }}
            >
              <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span>
            </span>
            <span
              className="h-[calc(100%-3rem)] w-[2px] "
              style={{ background: palette?.color }}
            ></span>
            <span
              className=" w-6 h-6 rounded-full   flex items-center justify-center"
              style={{ background: palette?.color }}
            >
              <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span>
            </span> */}
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
          <span className=" h-full  flex flex-col justify-start items-center">
            <span className="h-[calc(100%-1.5rem)] w-[2px] bg-[#b4b4b4]/[0.5]"></span>
            <span className=" w-6 h-6 rounded-full bg-[#b4b4b4]/[0.5]  flex items-center justify-center">
              {/* <span
                className="w-1 h-1 rounded-full "
                style={{ background: palette?.background }}
              ></span> */}
            </span>
          </span>
        </div>
        <div className="w-full lg:w-[49%] h-auto lg:mt-44 grid grid-rows-3 grid-cols-1 gap-3">
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
          <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              04.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Coding
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              Coding involves the development of both client-facing and server-side components. Front-end coding focuses on implementing the user interface with attention to design and user experience. Simultaneously, back-end coding addresses server logic, database management, and system integration to enable functionality with ease.
            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto  border-b-[2px] border-[#b4b4b4]/[0.5] flex flex-col justify-center items-start gap-3 py-10">
          <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] text-[70px] lg:text-[100px] group-hover:text-[#F15C20] font-bold leading-[4.5rem]">
              05.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Evaluation
            </h2>
            
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              This ensures the applications reliability, and adherence to requirements. Various evaluation methods, including unit, integration, and user acceptance testing, are employed to validate the software's performance. 
            </p> */}
          </div>
          <div className="group  w-full h-auto lg:h-auto flex flex-col justify-center items-start py-10 gap-3">
          <h1 className="transition-all duration-150 text-[#b4b4b4]/[0.7] group-hover:text-[#F15C20] text-[70px] lg:text-[100px] font-bold leading-[4.5rem]">
              06.
            </h1>
            <h2 className="text-[40px] lg:text-[48px] font-bold capitalize leading-tight lg:leading-[4.2rem]">
            Deployment
            </h2>
           
            {/* <p
              className="text-[14px] font-normal  "
              style={{ color: palette?.light_contrast_color }}
            >
              The final step involves releasing the application to production environments. It includes activities such as packaging, configuring, and deploying the software to servers or app stores. Thorough testing and stakeholder approval precede deployment, enabling a smooth transition to the live environment.

            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HybridProcess;
