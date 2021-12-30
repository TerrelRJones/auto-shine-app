import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../contexts/Auth";
import { Loading } from "../components/Loading";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export const Router = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
