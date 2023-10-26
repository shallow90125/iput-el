"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Defuse() {
  const router = useRouter();

  useEffect(() => {
    router.push("/defuse");
    console.log("a!");
  }, []);

  return <>eee</>;
}
