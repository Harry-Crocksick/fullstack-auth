"use server";

import { User } from "@prisma/client";
import prisma from "../db";
import * as bcrypt from "bcryptjs";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const saltedHash = await bcrypt.genSalt(11);
  const result = await prisma.user.create({
    data: { ...user, password: await bcrypt.hash(user.password, saltedHash) },
  });
  console.dir(result, { depth: null });
}
