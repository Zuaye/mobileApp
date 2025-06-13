export function FallbackCmponent({ title }: { title: string }) {
  return (
    <div className="min-h-screen mt-10 bg-white flex items-center justify-center">
      <div className="text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#f39200] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Chargement...
          </span>
        </div>
        <p className="mt-4 text-slate-600">Chargement de la page de {title}</p>
      </div>
    </div>
  );
}
