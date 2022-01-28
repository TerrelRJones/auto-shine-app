export type AuthData = {
  token: string;
  userId: string;
};
const signIn = async (email: string, password: string): Promise<AuthData> => {
  const user = await fetch("http://localhost:4001/api/v1/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const JWT = await user.json();

  if (!JWT.token) {
  }
  // console.log(JWT);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: JWT.token,
        userId: JWT.userId,
      });
    }, 1000);
  });
};

export const authService = {
  signIn,
};
