"use client";

import { getButton } from "@/utils/get-button";
import { getStop } from "@/utils/get-stop";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StopButton() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(async () => {
      const a = await getButton(session?.user?.uid);
      if (!a?.on) router.push("/dashboard");
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <p>押した回数：{count}</p>
      <Button
        onClick={() => {
          setCount(count + 1);
          if (10 < count) getStop(session?.user?.uid);
        }}
      >
        押して
      </Button>
    </div>
  );
}
