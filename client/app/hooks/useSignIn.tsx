import { useState } from "react";
import { useAuth } from "../contexts/Auth";

interface UseSignInTypes {
  email: string;
  password: string;
}

interface SubmitCredintialsType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

type UseSignInReturnType = [
  {
    loading: boolean;
  },
  {
    signIn: ({ email, password }: UseSignInTypes) => void;
    submitCredintials: ({
      firstName,
      lastName,
      email,
      password,
      password2,
    }: SubmitCredintialsType) => void;
  }
];

export const useSignIn = (): UseSignInReturnType => {
  const auth = useAuth();
  const [loading, isLoading] = useState(false);

  const signIn = async ({ email, password }: UseSignInTypes) => {
    isLoading(true);
    await auth.signIn(email, password);
  };

  const submitCredintials = async ({
    firstName,
    lastName,
    email,
    password,
    password2,
  }: SubmitCredintialsType) => {
    isLoading(true);
    await auth.register(firstName, lastName, email, password, password2);
  };

  return [{ loading }, { signIn, submitCredintials }];
};
