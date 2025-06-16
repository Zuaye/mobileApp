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
import { Search, FileText, AlertCircle } from "lucide-react";

interface Payment {
  id: string;
  transactionId: string;
  userId: string;
  userName: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "booking" | "subscription" | "refund";
  date: string;
  paymentMethod: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    transactionId: "TRX-2024-001",
    userId: "user-1",
    userName: "Jean Dupont",
    amount: 250.0,
    status: "completed",
    type: "booking",
    date: "2024-03-20T14:30:00",
    paymentMethod: "Carte bancaire",
  },
  {
    id: "2",
    transactionId: "TRX-2024-002",
    userId: "user-2",
    userName: "Marie Lambert",
    amount: 49.99,
    status: "pending",
    type: "subscription",
    date: "2024-03-21T09:15:00",
    paymentMethod: "PayPal",
  },
  // Ajoutez plus de paiements mockés ici
];

const statusColors = {
  completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  refunded: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const typeColors = {
  booking:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  subscription:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  refund: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = mockPayments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Gestion des Paiements
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total des Revenus
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              47,890.00 €
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              +8.15% vs mois dernier
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Transactions du Mois
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              342
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              +12.3% vs mois dernier
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Taux de Réussite
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              98.5%
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              +0.5% vs mois dernier
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Remboursements
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              1,250.00 €
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              +2.1% vs mois dernier
            </p>
          </div>
        </Card>
      </div>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Rechercher une transaction..."
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
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell>{payment.userName}</TableCell>
                    <TableCell>{formatAmount(payment.amount)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          typeColors[payment.type]
                        }`}
                      >
                        {payment.type === "booking"
                          ? "Réservation"
                          : payment.type === "subscription"
                          ? "Abonnement"
                          : "Remboursement"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[payment.status]
                        }`}
                      >
                        {payment.status === "completed"
                          ? "Complété"
                          : payment.status === "pending"
                          ? "En attente"
                          : payment.status === "failed"
                          ? "Échoué"
                          : "Remboursé"}
                      </span>
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {payment.status === "pending" && (
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-yellow-600 dark:text-yellow-400"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                        )}
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
