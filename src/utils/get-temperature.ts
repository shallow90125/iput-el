"use server";

import { PiDoc } from "@/types/PiDoc";

export async function getTemperature(
  uid: string | undefined,
): Promise<Pick<PiDoc, "on" | "temperature"> | undefined> {
  if (!uid) return undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/temperature/${uid}`,
    {
      method: "GET",
      cache: "no-store",
    },
  ).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
