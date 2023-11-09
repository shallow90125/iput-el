"use client";

import Loading from "@/app/loading";
import { postUser } from "@/utils/post-user";
import { Button, Input } from "@nextui-org/react";
import { useState, useTransition } from "react";

type Props = {
  uid: string | undefined;
};

export default function NotConnected(props: Props) {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  return isPending ? (
    <Loading />
  ) : (
    <div className=" grid place-items-center gap-4">
      <div>アラームと接続できません！</div>
      <Input type="url" label="URL" value={input} onValueChange={setInput} />
      <Button
        onClick={() => {
          startTransition(async () => {
            await postUser(props.uid, input);
          });
        }}
      >
        更新
      </Button>
    </div>
  );
}
