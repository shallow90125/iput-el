"use server";

import { Alarm } from "@/types/Alarm";
import { PiDoc } from "@/types/PiDoc";

export async function getUser(
  uid: string | undefined,
): Promise<(PiDoc & { alarms: Alarm[] }) | undefined> {
  if (!uid) return undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user/${uid}`,
    {
      method: "GET",
      cache: "no-store",
    },
  ).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
