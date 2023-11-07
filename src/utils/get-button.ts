"use server";

import { PiDoc } from "@/types/PiDoc";

export async function getButton(
  uid: string | undefined,
): Promise<Pick<PiDoc, "on"> | undefined> {
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
