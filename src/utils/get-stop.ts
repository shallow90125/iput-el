"use server";

import { zEnv } from "./env";

export async function getStop(uid: string | undefined): Promise<boolean> {
  if (!uid) return false;

  const res = await fetch(`${zEnv.SERVER_URL}/stop/${uid}`, {
    method: "GET",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return false;

  return true;
}
