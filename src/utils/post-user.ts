"use server";

import { zEnv } from "./env";

export async function postUser(
  uid: string | undefined,
  piId: string,
): Promise<boolean> {
  if (!uid) return false;

  const res = await fetch(`${zEnv.SERVER_URL}/user/${uid}`, {
    body: JSON.stringify({ piId: piId }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return false;

  return true;
}
