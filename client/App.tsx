import React from "react";
import { AuthProvider } from "./app/contexts/Auth";
import { Router } from "./app/routes/Router";
// import {StripeProvider} from "@stripe/stripe-react-native"

export default function App() {
  return (
    <AuthProvider>
      {/* <StripeProvider publishableKey="" > */}
      <Router />
      {/* </StripeProvider> */}
    </AuthProvider>
  );
}
