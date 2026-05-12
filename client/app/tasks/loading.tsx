export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-30 gap-2 animate-pulse">
      <div className="bg-surface p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>

        <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto"></div>
      </div>

      <div
        className="h-15 bg-card-glass rounded w-2/3 mx-auto mt-7 flex 
      justify-between items-center p-3"
      >
        <div className="w-10 h-5 bg-gray-300 rounded" />
        <div className="flex gap-5">
          <div className="w-10 h-5 bg-gray-300 rounded" />
          <div className="w-10 h-5 bg-gray-300 rounded" />
          <div className="w-10 h-5 bg-gray-300 rounded" />
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mt-5
      justify-items-center"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface p-6 rounded-lg transition-all duration-300 
      hover:bg-surface-hover hover:shadow-xl 
      cursor-pointer relative 
      flex flex-col justify-around items-center gap-3 min-w-90 max-w-100 min-h-50 overflow-hidden
     "
          >
            <div className="h-7 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
