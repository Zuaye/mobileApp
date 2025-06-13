import { Hero } from "@/src/components/home/hero";
import { AppHeader } from "@/src/components/navigation/app-header";
import { AvailableRooms } from "@/src/components/hotel/available-rooms";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen flex-col pt-14">
        {/* Hero compact avec recherche intégrée */}
        <div className="relative">
          <Hero />
        </div>

        {/* Chambres Disponibles */}
        <section className="w-full mt-24 px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Chambres Disponibles</h2>
              <p className="text-sm text-muted-foreground">
                Réservez immédiatement
              </p>
            </div>
          </div>
          <AvailableRooms />
        </section>
      </main>
    </>
  );
}
