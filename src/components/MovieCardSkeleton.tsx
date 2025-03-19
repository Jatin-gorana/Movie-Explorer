export default function MovieCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
      <div className="aspect-[2/3] relative w-full bg-gray-200 animate-pulse dark:bg-gray-700" />
      <div className="p-4">
        <div className="mb-2 h-5 w-4/5 bg-gray-200 animate-pulse dark:bg-gray-700 rounded"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-200 animate-pulse dark:bg-gray-700 rounded-full"></div>
            <div className="ml-1 h-4 w-8 bg-gray-200 animate-pulse dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-4 w-10 bg-gray-200 animate-pulse dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
} 