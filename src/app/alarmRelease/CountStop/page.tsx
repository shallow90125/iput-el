"use client";

import { stopAlarms } from "@/utils/stop-alarms";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CountStop() {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const counter = async () => {
    if (count == 9) {
      stopAlarms();
      router.push("/dashboard");
    }
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <p>押した回数：{count}</p>
      <Button onClick={counter}>押して</Button>
    </div>
  );
}
