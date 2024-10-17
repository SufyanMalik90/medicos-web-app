const DataStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
        >
          <div className="flex h-14.5 w-14.5 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            {/* Placeholder for icon */}
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="mb-1.5 h-6 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="h-4 w-10 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataStatsSkeleton;
