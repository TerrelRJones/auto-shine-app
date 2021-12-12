import prisma from "./client";

interface regUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

export async function createUser(user: regUser) {
  if (user.password !== user.password2) {
    return "Passwords do not match";
  }

  return await prisma.user.create({
    data: user,
  });
}
