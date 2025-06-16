export type MobileMoneyProvider = "Orange Money" | "M-Pesa" | "Airtel Money";

export interface PaymentDetails {
  amount: number;
  currency: "CDF" | "USD";
  phoneNumber: string;
  provider: MobileMoneyProvider;
  description: string;
}

export interface PaymentStatus {
  status: "pending" | "completed" | "failed";
  transactionId: string;
  timestamp: Date;
  message?: string;
}

export interface ServiceBooking {
  serviceId: string;
  serviceName: string;
  duration: number; // en heures
  price: number;
  currency: "CDF" | "USD";
}
