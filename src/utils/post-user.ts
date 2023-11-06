"use server";

export async function postUser(
  uid: string | undefined,
  piId: string,
): Promise<boolean> {
  if (!uid) return false;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/user/${uid}`,
    {
      body: JSON.stringify({ piId: piId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      cache: "no-store",
    },
  ).catch(() => undefined);

  if (!res?.ok) return false;

  return true;
}
