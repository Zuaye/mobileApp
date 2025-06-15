import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function RoomNotFound() {
  return (
    <div className="min-h-[80vh] mt-24 w-full rounded-3xl mx-auto max-w-[96%] bg-slate-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Chambre non trouvée</h1>
      <p className="mb-8">
        Désolé, nous n'avons pas pu trouver la chambre que vous recherchez.
      </p>
      <Link href="/rooms">
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux chambres
        </Button>
      </Link>
    </div>
  );
}
