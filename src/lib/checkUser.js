import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;
 
  const existing = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });
  if (existing) return existing;
 
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
      imageUrl: user.imageUrl ?? null,
      email: user.emailAddresses?.[0]?.emailAddress ?? null, 
      date: new Date(),
    },
  });

  return newUser;
};
