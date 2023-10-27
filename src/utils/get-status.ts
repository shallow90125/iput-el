"use server";

export async function getStatus(): Promise<Status | undefined> {
  const res = await fetch("http://ok210108.local:4000/status", {
    method: "GET",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  return await res.json();
}
