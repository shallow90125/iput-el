"use server";

import { Alarm } from "@/types/Alarm";
import { zEnv } from "./env";

export async function getAlarms(
  piId: string | undefined,
): Promise<Alarm[] | undefined> {
  if (!piId) return undefined;

  const res = await fetch(`${zEnv.SERVER_URL}/pi/${piId}/alarms`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${zEnv.SERVER_TOKEN}`,
    },
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
