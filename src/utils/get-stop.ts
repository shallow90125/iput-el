"use server";

export async function getStop(uid: string | undefined): Promise<boolean> {
  if (!uid) return false;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/stop/${uid}`,
    {
      method: "GET",
      cache: "no-store",
    },
  ).catch(() => undefined);

  if (!res?.ok) return false;

  return true;
}
