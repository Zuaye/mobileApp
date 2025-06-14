"use client";

import { useParams } from "next/navigation";
import { WomanProfile } from "@/src/components/filles/woman-profile";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";

export default function WomenProfilPage() {
  const params = useParams();
  const profile = AVAILABLE_WOMENS.find((woman) => woman.id === params.id);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-600">Profil non trouvé</p>
      </div>
    );
  }

  return <WomanProfile profile={profile} />;
}
