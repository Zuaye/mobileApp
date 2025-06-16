"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  Settings,
  Bell,
  MessageSquare,
  LogOut,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

// Données de test pour les réservations
const RESERVATIONS = [
  {
    id: "1",
    clientName: "John Doe",
    date: "2024-03-20",
    time: "14:00",
    duration: "2h",
    service: "Massage",
    status: "pending",
    amount: 15000,
  },
  {
    id: "2",
    clientName: "Mike Smith",
    date: "2024-03-21",
    time: "18:00",
    duration: "3h",
    service: "Dîner en ville",
    status: "confirmed",
    amount: 25000,
  },
  {
    id: "3",
    clientName: "David Brown",
    date: "2024-03-22",
    time: "20:00",
    duration: "4h",
    service: "Soirée",
    status: "completed",
    amount: 35000,
  },
];

// Données de test pour les messages
const MESSAGES = [
  {
    id: "1",
    from: "John Doe",
    message: "Bonjour, je voudrais réserver pour ce soir",
    time: "10:30",
    read: false,
  },
  {
    id: "2",
    from: "Mike Smith",
    message: "Est-ce que vous êtes disponible demain ?",
    time: "09:15",
    read: true,
  },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("overview");

  // Statistiques du mois
  const stats = {
    reservations: 15,
    earnings: 250000,
    rating: 4.8,
    views: 324,
  };

  const handleStatusChange = (reservationId: string, newStatus: string) => {
    // TODO: Implémenter le changement de statut
    console.log("Changement de statut:", reservationId, newStatus);
  };

  const handleDeleteReservation = (reservationId: string) => {
    // TODO: Implémenter la suppression
    console.log("Suppression de la réservation:", reservationId);
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 py-4 sm:py-8 mt-16",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      <div className="container mx-auto px-4">
        {/* En-tête du tableau de bord - Optimisé pour mobile */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
              Tableau de bord
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Gérez vos réservations et votre profil
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation par onglets - Optimisée pour mobile */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent">
            <TabsTrigger
              value="overview"
              className="flex-1 min-w-[120px] text-sm sm:text-base"
            >
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger
              value="reservations"
              className="flex-1 min-w-[120px] text-sm sm:text-base"
            >
              Réservations
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex-1 min-w-[120px] text-sm sm:text-base"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble - Optimisée pour mobile */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <Card className="p-3 sm:p-4">
                <CardHeader className="flex flex-row items-center justify-between p-0 sm:pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">
                    Réservations
                  </CardTitle>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <div className="text-lg sm:text-2xl font-bold">
                    {stats.reservations}
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    +2 depuis hier
                  </p>
                </CardContent>
              </Card>

              <Card className="p-3 sm:p-4">
                <CardHeader className="flex flex-row items-center justify-between p-0 sm:pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">
                    Revenus
                  </CardTitle>
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <div className="text-lg sm:text-2xl font-bold">
                    {stats.earnings.toLocaleString()} FC
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Ce mois-ci
                  </p>
                </CardContent>
              </Card>

              <Card className="p-3 sm:p-4">
                <CardHeader className="flex flex-row items-center justify-between p-0 sm:pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">
                    Note moyenne
                  </CardTitle>
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <div className="text-lg sm:text-2xl font-bold">
                    {stats.rating}/5
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Basé sur 45 avis
                  </p>
                </CardContent>
              </Card>

              <Card className="p-3 sm:p-4">
                <CardHeader className="flex flex-row items-center justify-between p-0 sm:pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">
                    Vues du profil
                  </CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <div className="text-lg sm:text-2xl font-bold">
                    {stats.views}
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Cette semaine
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Table des réservations - Optimisée pour mobile */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  Dernières réservations
                </CardTitle>
                <CardDescription className="text-sm">
                  Vos 5 dernières réservations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          Client
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Date
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Service
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Montant
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Statut
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {RESERVATIONS.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell className="text-xs sm:text-sm">
                            {reservation.clientName}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                            {reservation.date} à {reservation.time}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {reservation.service}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                            {reservation.amount.toLocaleString()} FC
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap",
                                {
                                  "bg-yellow-100 text-yellow-800":
                                    reservation.status === "pending",
                                  "bg-green-100 text-green-800":
                                    reservation.status === "confirmed",
                                  "bg-blue-100 text-blue-800":
                                    reservation.status === "completed",
                                }
                              )}
                            >
                              {reservation.status === "pending" && "En attente"}
                              {reservation.status === "confirmed" && "Confirmé"}
                              {reservation.status === "completed" && "Terminé"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Réservations - Optimisée pour mobile */}
          <TabsContent value="reservations">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  Toutes les réservations
                </CardTitle>
                <CardDescription className="text-sm">
                  Gérez vos réservations et leur statut
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          Client
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Date
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Service
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Durée
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Montant
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Statut
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {RESERVATIONS.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell className="text-xs sm:text-sm">
                            {reservation.clientName}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                            {reservation.date} à {reservation.time}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {reservation.service}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {reservation.duration}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                            {reservation.amount.toLocaleString()} FC
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap",
                                {
                                  "bg-yellow-100 text-yellow-800":
                                    reservation.status === "pending",
                                  "bg-green-100 text-green-800":
                                    reservation.status === "confirmed",
                                  "bg-blue-100 text-blue-800":
                                    reservation.status === "completed",
                                }
                              )}
                            >
                              {reservation.status === "pending" && "En attente"}
                              {reservation.status === "confirmed" && "Confirmé"}
                              {reservation.status === "completed" && "Terminé"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 sm:gap-2">
                              {reservation.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                    onClick={() =>
                                      handleStatusChange(
                                        reservation.id,
                                        "confirmed"
                                      )
                                    }
                                  >
                                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                    onClick={() =>
                                      handleStatusChange(
                                        reservation.id,
                                        "rejected"
                                      )
                                    }
                                  >
                                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() =>
                                  handleDeleteReservation(reservation.id)
                                }
                              >
                                <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages - Optimisés pour mobile */}
          <TabsContent value="messages">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Messages</CardTitle>
                <CardDescription className="text-sm">
                  Vos conversations avec les clients
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "p-3 sm:p-4 rounded-lg",
                        message.read
                          ? "bg-slate-100 dark:bg-slate-800"
                          : "bg-blue-50 dark:bg-blue-900"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm sm:text-base">
                          {message.from}
                        </h3>
                        <span className="text-xs sm:text-sm text-slate-500">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
