import { Loader2 } from "lucide-react";

export function LoaderView() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Chargement en cours...</p>
      </div>
    </div>
  );
}
