"use server";

import { Alarm } from "@/types/Alarm";
import { revalidatePath } from "next/cache";
import { zEnv } from "./env";

export async function postAlarms(
  piId: string | undefined,
  alarms: Alarm[],
): Promise<boolean> {
  revalidatePath("/dashboard", "page");

  if (!piId) return false;

  const res = await fetch(`${zEnv.SERVER_URL}/pi/${piId}/alarms`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${zEnv.SERVER_TOKEN}`,
    },
    body: JSON.stringify(alarms.map((v) => ({ ...v, piId: piId }))),
  }).catch((e) => {
    console.error(e);
    return undefined;
  });

  return !!res?.ok;
}
