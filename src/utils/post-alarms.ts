"use server";

import { Alarm } from "@/types/Alarm";
import { zEnv } from "./env";

export async function postAlarms(alarms: Alarm[], piId: string) {
  const res = await fetch(`${zEnv.SERVER_URL}/alarms/${piId}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alarms.map((v) => ({ ...v, piId: piId }))),
  }).catch((e) => {
    console.error(e);
    return undefined;
  });

  console.log(res?.statusText);

  return !!res?.ok;
}
