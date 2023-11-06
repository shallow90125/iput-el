"use client";

import Loading from "@/app/loading";
import { postUser } from "@/utils/post-user";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  uid: string;
};

export default function NotConnected(props: Props) {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  return isPending ? (
    <Loading />
  ) : (
    <div className=" grid place-items-center gap-4">
      <div>アラームと接続できません！</div>
      <Input type="url" label="URL" value={input} onValueChange={setInput} />
      <Button
        onClick={() => {
          startTransition(async () => {
            const res = await postUser(session?.user.uid, input);
            if (res) router.push("/redirect");
          });
        }}
      >
        更新
      </Button>
    </div>
  );
}
