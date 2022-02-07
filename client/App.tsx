import React from "react";
import { AuthProvider } from "./app/contexts/Auth";
import { Router } from "./app/routes/Router";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <AuthProvider>
      <StripeProvider publishableKey="pk_test_DzfX7lJ5sLJBsmFDi9lnzgUu">
        <Router />
      </StripeProvider>
    </AuthProvider>
  );
}
