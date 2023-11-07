"use client";

import { stopAlarms } from "@/utils/stop-alarms";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const randompassword = (
  Math.random() * 900000000000000 +
  100000000000000
).toFixed(0);
console.log(randompassword);

export default function PasswordStop() {
  const [password, setPassword] = useState("");

  const Submit = async () => {
    if (password == randompassword) {
      console.log("aaaa");
      stopAlarms();
    }
  };
  return (
    <div>
      <p>{randompassword}</p>
      <div className="flex gap-2">
        <Input
          type="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button onClick={Submit}>実行</Button>
      </div>
    </div>
  );
}
