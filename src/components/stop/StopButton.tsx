"use client";

import { getButton } from "@/utils/get-button";
import { postStop } from "@/utils/post-stop";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  uid: string;
  piId: string;
};

export default function StopButton(props: Props) {
  const [count, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(async () => {
      const res = await getButton(props.piId);

      if (!res?.on) {
        router.push("/dashboard");
        clearInterval(id);
        return;
      }
    }, 2000);

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
          if (8 < count) {
            postStop(props.piId);
            router.push("/dashboard");
          }
        }}
      >
        押して
      </Button>
    </div>
  );
}
