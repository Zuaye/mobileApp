"use client";

import AdminContainer from "@/src/components/admin-components/admin-container";
import { Card } from "@/src/components/ui/card";
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  UserCircle,
  MessageSquare,
} from "lucide-react";

const stats = [
  {
    name: "Hôtels",
    value: "24",
    change: "+12%",
    icon: Building2,
  },
  {
    name: "Femmes",
    value: "156",
    change: "+25%",
    icon: UserCircle,
  },
  {
    name: "Utilisateurs",
    value: "2.4k",
    change: "+18%",
    icon: Users,
  },
  {
    name: "Réservations",
    value: "842",
    change: "+32%",
    icon: CreditCard,
  },
  {
    name: "Messages",
    value: "128",
    change: "+8%",
    icon: MessageSquare,
  },
  {
    name: "Revenus",
    value: "12.5M",
    change: "+22%",
    icon: TrendingUp,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Tableau de bord
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Vue d'ensemble de votre activité
        </p>
      </div>

      <AdminContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.name}
                className="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.name}
                    </p>
                    <div className="flex items-baseline mt-2">
                      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
                      <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </AdminContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <div className="space-y-4">
            {/* Liste d'activités */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    Nouvelle réservation à l'hôtel Pullman
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Il y a {i + 1} heure{i > 0 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Messages récents</h2>
          <div className="space-y-4">
            {/* Liste de messages */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-medium">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Message de l'utilisateur {i + 1}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AdminContainer>
      </div>
    </div>
  );
}
