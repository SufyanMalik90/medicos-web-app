// import { ApexOptions } from "apexcharts";
// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
// import { api } from "../../axios.js";
// import { useRouter } from "next/navigation.js";
// import Cookies from "js-cookie";


// interface RevenueData {
//   month: string;
//   totalInvoices: number;
//   receivedAmount: number;
//   dueAmount: number;
//   date: Date
// }

// interface ApiResponse {
//   success: boolean;
//   type: string;
//   data: RevenueData[];
//   overallReceivedAmount: number;
//   overallDueAmount: number;
// }

// const ChartOne: React.FC = () => {
//   const router = useRouter();
//   const [type, setType] = useState<"yearly" | "monthly">("yearly");
//   const [seriesData, setSeriesData] = useState<any[]>([]);
//   const [overallReceivedAmount, setOverallReceivedAmount] = useState(0);
//   const [overallDueAmount, setOverallDueAmount] = useState(0);

//   useEffect(() => {
//     const fetchRevenue = async () => {
//       try {
//         const response = await api.post("/api/revenue", { type });
//         const apiData: ApiResponse = response.data;
        
//         if (apiData.success) {
//           let categories: string[] = [];
//           let receivedAmounts: number[] = [];
//           let dueAmounts: number[] = [];

//           if (type === "yearly") {
//             categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             receivedAmounts = apiData.data.map(item => item.receivedAmount);
//             dueAmounts = apiData.data.map(item => item.dueAmount);
//           } else if (type === "monthly") {
//             // Generate categories for days of the month
//             categories = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
//             // Initialize arrays with zeros
//             receivedAmounts = new Array(31).fill(0);
//             dueAmounts = new Array(31).fill(0);
            
//             // Populate arrays with API data
//             apiData.data.forEach(item => {
//               const day = new Date(item.date).getDate();
//               receivedAmounts[day - 1] = item.receivedAmount;
//               dueAmounts[day - 1] = item.dueAmount;
//             });
//           }
          
//           setSeriesData([
//             {
//               name: "Received Amount",
//               data: receivedAmounts,
//             },
//             {
//               name: "Due Amount",
//               data: dueAmounts,
//             },
//           ]);
          
//           // Set the overall received and due amounts
//           setOverallReceivedAmount(apiData.overallReceivedAmount);
//           setOverallDueAmount(apiData.overallDueAmount);
//         } else {
//           console.error("Error fetching revenue data:", response.data.message);
//         }
//       } catch (error: any) {
//         if (error?.response?.status === 401) {
//           router.push("/auth/sign-in");
//           Cookies.remove("token");
//         }
//         console.error("Error fetching revenue:", error);
//       }
//     };

//     fetchRevenue();
//   }, [type]);

//   const handleSelectChange = (selectedOption: string) => {
//     console.log("selectedOption", selectedOption);
    
//     const newType = selectedOption.toLowerCase();
//     setType(newType as "yearly" | "monthly");
//   };

//   const options: ApexOptions = {
//     legend: {
//       show: false,
//       position: "top",
//       horizontalAlign: "left",
//     },
//     colors: ["#5750F1", "#0ABEF9"],
//     chart: {
//       fontFamily: "Satoshi, sans-serif",
//       height: 310,
//       type: "area",
//       toolbar: {
//         show: false,
//       },
//     },
//     fill: {
//       gradient: {
//         opacityFrom: 0.55,
//         opacityTo: 0,
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 1024,
//         options: {
//           chart: {
//             height: 300,
//           },
//         },
//       },
//       {
//         breakpoint: 1366,
//         options: {
//           chart: {
//             height: 320,
//           },
//         },
//       },
//     ],
//     stroke: {
//       curve: "smooth",
//     },

//     markers: {
//       size: 0,
//     },
//     grid: {
//       strokeDashArray: 5,
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     tooltip: {
//       fixed: {
//         enabled: !1,
//       },
//       x: {
//         show: !1,
//       },
//       y: {
//         title: {
//           formatter: function (e) {
//             return "";
//           },
//         },
//       },
//       marker: {
//         show: !1,
//       },
//     },
//     xaxis: {
//       type: "category",
//       categories:type === "monthly" ? Array.from({ length: 31 }, (_, i) => `${i + 1}`) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     yaxis: {
//       title: {
//         style: {
//           fontSize: "0px",
//         },
//       },
//     },
//   };

//   return (
//     <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
//       <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
//             Payments Overview
//           </h4>
//         </div>
//         <div className="flex items-center gap-2.5">
//           <p className="font-medium uppercase text-dark dark:text-dark-6">
//             Short by:
//           </p>
//           <DefaultSelectOption 
//             options={["Yearly", "Monthly"]} 
//             onChange={handleSelectChange}
//           />
//         </div>
//       </div>
//       <div>
//         <div className="-ml-4 -mr-5">
//           <ReactApexChart
//             options={options}
//             series={seriesData}
//             type="area"
//             height={310}
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
//         <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
//           <p className="font-medium">Received Amount</p>
//           <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
//             {overallReceivedAmount.toLocaleString()}
//           </h4>
//         </div>
//         <div className="xsm:w-1/2">
//           <p className="font-medium">Due Amount</p>
//           <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
//             {overallDueAmount.toLocaleString()}
//           </h4>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default ChartOne;
