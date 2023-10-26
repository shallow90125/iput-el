"use server";

import { Alarm } from "@/types/Alarm";

export async function postAlarms(alarms: Alarm[]) {
    console.log("postAlarms");
    console.log(alarms.map((a) => a.isEnabled))
    const res = await fetch("http://ok210108.local:4000/alarms", {method: "POST", cache: "no-store", headers: {
        "Content-Type": "application/json"
    }, body: JSON.stringify(alarms)}).catch((a) => {
        console.log(a);
        return undefined;
    });
    console.log(res?.status);
}