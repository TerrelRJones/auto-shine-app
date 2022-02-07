import React, { createContext, useState, useContext, useEffect } from "react";
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthData, authService } from "../services/authService";

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
  ): Promise<void>;
  signOut(): void;
  BASE_URL: string;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const BASE_URL = "https://auto-shine-app.herokuapp.com/";

  const [authData, setAuthData] = useState<AuthData>();
  // const [userData, setUserData] = useState("");

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        // setAuthData(true);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    // const _authData = await authService.signIn(email, password);
    const _authData = await authService.signIn(email, password);
    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    if (_authData.userId) {
      // setAuthData(true);
      setAuthData(_authData);
      // setUserData(_authData.userId);
      AsyncStorage.setItem("@AuthData", JSON.stringify(_authData));
      console.log(_authData);
    } else {
      console.log("Wrong email or password");
    }

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
  };

  interface User {}

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string
  ) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    // const _authData = await authService.signIn(email, password);
    const _authData = await authService.register(
      firstName,
      lastName,
      email,
      password,
      password2
    );
    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    if (_authData.userId) {
      // setAuthData(true);
      setAuthData(_authData);
      // setUserData(_authData.userId);
      AsyncStorage.setItem("@AuthData", JSON.stringify(_authData));
      console.log(_authData);
    } else {
      console.log("Wrong email or password");
    }

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    // setAuthData(false);
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
    await AsyncStorage.removeItem("@AuthData");
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider
      value={{ authData, loading, signIn, register, signOut, BASE_URL }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
