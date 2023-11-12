"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Stop() {
  const router = useRouter();

  return (
    <div className=" grid place-items-center gap-4">
      <div className=" text-xl">アラーム動作中！</div>
      <Button
        onClick={() => {
          router.push("/stop");
        }}
      >
        停止する
      </Button>
    </div>
  );
}
