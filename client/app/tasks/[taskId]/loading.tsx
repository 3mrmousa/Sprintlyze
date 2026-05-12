export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 gap-6 animate-pulse">
      <div className="w-full max-w-3xl bg-card-modal p-8 rounded-2xl mt-15">
        <div className="flex justify-between">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6" />
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6" />
        </div>

        <div className="h-2 bg-gray-300 rounded w-full mb-6 mt-10" />

        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
        <div className="space-y-2 mt-10">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
        <div className="space-y-2 mt-10">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
        <div className="space-y-2 mt-10">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
        <div className="space-y-2 mt-10">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
