"use server";

import { PiDoc } from "@/types/PiDoc";
import { zEnv } from "./env";

export async function getButton(
  uid: string | undefined,
): Promise<Pick<PiDoc, "on"> | undefined> {
  if (!uid) return undefined;

  const res = await fetch(`${zEnv.SERVER_URL}/temperature/${uid}`, {
    method: "GET",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
