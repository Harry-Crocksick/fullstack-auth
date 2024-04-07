import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { CredentialsConfig } from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "./utils/db";
import * as bcrypt from "bcryptjs";

const credentialsConfig = CredentialsProvider({
  name: "Crendentials",
  credentials: {
    username: {
      label: "Username",
      type: "text",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },
  async authorize(credentials) {
    const user = await prisma.user.findUnique({
      where: {
        email: credentials?.username as string,
      },
    });
    if (!user) throw new Error("Username or password is not correct!");
    // Naive way to check password
    // const isPasswordCorrect = credentials?.password === user.password;
    // if (isPasswordCorrect) return user;
    if (!credentials?.password)
      throw new Error("Please provide Your Password!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password as string,
      user.password
    );
    if (!isPasswordCorrect)
      throw new Error("Username or password is not correct!");

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
}) satisfies CredentialsConfig;

const authConfig = {
  providers: [Google, Github, credentialsConfig],
  callbacks: {},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
