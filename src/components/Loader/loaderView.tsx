export function LoaderView() {
  return (
    <div className="min-h-screen dark:bg-slate-900 flex items-center justify-center text-white">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-blue-500 border-b-transparent rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
}
