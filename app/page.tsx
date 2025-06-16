import { Hero } from "@/src/components/home/hero";
import { AppHeader } from "@/src/components/navigation/app-header";
import { AvailableRooms } from "@/src/components/hotel/available-rooms";
import { AvailableWomens } from "@/src/components/filles/available-womens";
import { RoomStatus } from "@/src/components/hotel/room-status";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen flex-col pt-14">
        {/* Statuts des Chambres style WhatsApp */}
        <RoomStatus />

        {/* Hero compact avec recherche intégrée */}
        <div className="relative">
          <Hero />
        </div>

        {/* Chambres Disponibles */}
        <AvailableRooms />

        {/* Filles de Chambres Disponibles */}
        <AvailableWomens />
      </main>
    </>
  );
}
