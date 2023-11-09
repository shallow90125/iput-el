"use server";

import { PiDoc } from "@/types/PiDoc";
import { zEnv } from "./env";

export async function getButton(
  piId: string | undefined,
): Promise<Pick<PiDoc, "on"> | undefined> {
  if (!piId) return undefined;

  const res = await fetch(`${zEnv.SERVER_URL}/pi/${piId}/button`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${zEnv.SERVER_TOKEN}`,
    },
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
