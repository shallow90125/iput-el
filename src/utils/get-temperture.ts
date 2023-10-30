"use server";

export async function gettemperture(): Promise<number | undefined> {
  const res = await fetch("http://ok210108.local:4000/temperature", {
    method: "GET",
    cache: "no-store",
  }).catch(() => undefined);

  if (!res?.ok) return undefined;

  const data: { temperature: number; humidity: number } = await res.json();

  return data.temperature;
}
