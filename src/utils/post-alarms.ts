"use server";

import { Alarm } from "@/types/Alarm";

export async function postAlarms(alarms: Alarm[]) {
  const res = await fetch("http://ok210108.local:4000/alarms", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alarms),
  }).catch(() => undefined);

  return !!res?.ok;
}
