"use client";

import { postStop } from "@/utils/post-stop";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  uid: string;
  piId: string;
};

export default function StopButton(props: Props) {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <p>押した回数：{count}</p>
      <Button
        onClick={() => {
          setCount(count + 1);
          if (10 < count) {
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
