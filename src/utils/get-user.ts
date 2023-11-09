"use server";

import { PiDoc } from "@/types/PiDoc";
import { zEnv } from "./env";

export async function getUser(
  uid: string | undefined,
): Promise<PiDoc | undefined> {
  if (!uid) return undefined;

  const res = await fetch(`${zEnv.SERVER_URL}/user/${uid}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${zEnv.SERVER_TOKEN}`,
    },
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
