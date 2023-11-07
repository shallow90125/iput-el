"use server";

import { Alarm } from "@/types/Alarm";

export async function getAlarms(): Promise<Alarm[] | undefined> {
  const res = await fetch("http://ok210108.local:4000/alarms", {
    method: "GET",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
