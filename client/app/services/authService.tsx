export type AuthData = {
  token: string;
  userId: string;
};
const BASE_URL: string = "https://auto-shine-app.herokuapp.com/";

const signIn = async (email: string, password: string): Promise<AuthData> => {
  const user = await fetch(`${BASE_URL}api/v1/login`, {
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

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  password2: string
): Promise<AuthData> => {
  const user = await fetch(
    "https://auto-shine-app.herokuapp.com/api/v1/register",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        password2,
      }),
    }
  );

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
  register,
};
