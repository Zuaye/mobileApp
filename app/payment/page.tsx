import { Suspense } from "react";
import PaymentClient from "./payment-client";
import { FallbackCmponent } from "@/src/components/fallback/fallbackComponent";

export default function PaymentPage() {
  return (
    <Suspense fallback={<FallbackCmponent title="Paiement" />}>
      <PaymentClient />
    </Suspense>
  );
}
