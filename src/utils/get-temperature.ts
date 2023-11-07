"use server";

import { PiDoc } from "@/types/PiDoc";
import { zEnv } from "./env";

export async function getTemperature(
  uid: string | undefined,
): Promise<Pick<PiDoc, "on" | "temperature"> | undefined> {
  if (!uid) return undefined;

  const res = await fetch(`${zEnv.SERVER_URL}/temperature/${uid}`, {
    method: "GET",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
