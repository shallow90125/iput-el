"use server";

import { revalidatePath } from "next/cache";
import { zEnv } from "./env";

export async function postUser(
  uid: string | undefined,
  piId: string | undefined,
): Promise<boolean> {
  revalidatePath("/dashboard", "page");
  revalidatePath("/stop", "page");

  if (!uid || !piId) return false;

  const res = await fetch(`${zEnv.SERVER_URL}/user/${uid}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${zEnv.SERVER_TOKEN}`,
    },
    body: JSON.stringify({ piId: piId }),
  }).catch(() => undefined);

  if (!res?.ok) return false;

  return true;
}
