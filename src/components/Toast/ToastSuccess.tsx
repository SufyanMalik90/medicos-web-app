import React from "react";

interface AlertSuccessProps {
  title: string;
  onClose: () => void;
}

const ToastSuccess = ({ title, onClose }: AlertSuccessProps) => {
  return (
    <>
      <div className="mx-auto mt-4 w-max space-y-6 font-[sans-serif]">
        <div
          className="flex w-max max-w-sm items-center rounded-md bg-white p-4 text-gray-800 shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)]"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 inline w-[18px] shrink-0 fill-green-500"
            viewBox="0 0 512 512"
          >
            <ellipse cx="246" cy="246" data-original="#000" rx="246" ry="246" />
            <path
              className="fill-white"
              d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
              data-original="#000"
            />
          </svg>
          <span className="text-sm font-semibold tracking-wide">
            {title}
          </span>
        </div>

       
      </div>
    </>
  );
};

export default ToastSuccess;
