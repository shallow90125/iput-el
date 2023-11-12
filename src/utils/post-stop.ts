"use server";

import { revalidatePath } from "next/cache";
import { zEnv } from "./env";

export async function postStop(piId: string | undefined): Promise<boolean> {
  revalidatePath("/dashboard", "page");
  revalidatePath("/stop", "page");

  if (!piId) return false;

  const res = await fetch(`${zEnv.SERVER_URL}/pi/${piId}/stop`, {
    method: "POST",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${zEnv.SERVER_TOKEN}`,
    },
  }).catch(() => undefined);

  if (!res?.ok) return false;

  return true;
}
