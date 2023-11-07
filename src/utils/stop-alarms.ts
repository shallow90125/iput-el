"use server"

export async function stopAlarms(){
    const res = await fetch("http://ok210108.local:4000/stop", 
    {method: "GET", 
    cache: "no-store", 
    headers: {
        "Content-Type": "application/json"
    }, }).catch(() => {
        return undefined;
    }); 
}