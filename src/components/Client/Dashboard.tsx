"use client";

import { motion } from "framer-motion";
import {
  Home,
  MessageSquare,
  Heart,
  Search,
  TrendingUp,
  Bell,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "../ui/card";

interface DashboardStats {
  savedProperties: number;
  messages: number;
  notifications: number;
  recentSearches: number;
}

export default function ClientDashboard() {
  const stats: DashboardStats = {
    savedProperties: 5,
    messages: 3,
    notifications: 2,
    recentSearches: 4,
  };

  const quickActions = [
    {
      title: "Rechercher un bien",
      description: "Trouvez votre propriété idéale",
      icon: Search,
      href: "/client/search",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Messages",
      description: "Discutez avec les agents",
      icon: MessageSquare,
      href: "/client/messages",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Favoris",
      description: "Consultez vos biens sauvegardés",
      icon: Heart,
      href: "/client/favorites",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      title: "Tendances",
      description: "Découvrez les biens populaires",
      icon: TrendingUp,
      href: "/client/trending",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tableau de bord
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Bienvenue sur votre espace personnel
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          <span>Notifications ({stats.notifications})</span>
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Home className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Biens sauvegardés
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.savedProperties}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Messages non lus
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.messages}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Recherches récentes
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.recentSearches}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Favoris
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.savedProperties}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-3 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biens récemment consultés */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Biens récemment consultés
          </h2>
          <div className="space-y-4">
            {/* Liste des biens récents */}
            <p className="text-slate-600 dark:text-slate-400">
              Aucun bien consulté récemment
            </p>
          </div>
        </Card>

        {/* Activité récente */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Activité récente
          </h2>
          <div className="space-y-4">
            {/* Liste des activités */}
            <p className="text-slate-600 dark:text-slate-400">
              Aucune activité récente
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
