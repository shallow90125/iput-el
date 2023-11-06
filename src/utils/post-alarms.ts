"use server";

import { Alarm } from "@/types/Alarm";

export async function postAlarms(alarms: Alarm[], piId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/alarms/${piId}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alarms.map((v) => ({ ...v, piId: piId }))),
    },
  ).catch((e) => {
    console.error(e);
    return undefined;
  });

  console.log(res?.statusText);

  return !!res?.ok;
}
