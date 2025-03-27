export const CardSkeleton = () => (
  <div className="animate-pulse m-2">
    <div className="rounded-md bg-slate-700 h-48 w-full"></div>
    <div className="space-y-2 mt-3">
      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    </div>
  </div>
);
