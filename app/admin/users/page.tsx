"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card } from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Search, Edit2, Trash2, Ban, CheckCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "moderator";
  status: "active" | "suspended" | "banned";
  joinedDate: string;
  lastLogin: string;
  bookingsCount: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "user",
    status: "active",
    joinedDate: "2024-01-15",
    lastLogin: "2024-03-20",
    bookingsCount: 12,
  },
  {
    id: "2",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    role: "moderator",
    status: "active",
    joinedDate: "2023-11-20",
    lastLogin: "2024-03-21",
    bookingsCount: 8,
  },
  // Ajoutez plus d'utilisateurs mockés ici
];

const statusColors = {
  active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  suspended:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  banned: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const roleColors = {
  admin:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  moderator: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  user: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Gestion des Utilisateurs
        </h2>
      </div>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Inscription</TableHead>
                  <TableHead>Dernière Connexion</TableHead>
                  <TableHead>Réservations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          roleColors[user.role]
                        }`}
                      >
                        {user.role === "admin"
                          ? "Admin"
                          : user.role === "moderator"
                          ? "Modérateur"
                          : "Utilisateur"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[user.status]
                        }`}
                      >
                        {user.status === "active"
                          ? "Actif"
                          : user.status === "suspended"
                          ? "Suspendu"
                          : "Banni"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.joinedDate)}</TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell>{user.bookingsCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.status === "active" ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-yellow-600 dark:text-yellow-400"
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-green-600 dark:text-green-400"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
