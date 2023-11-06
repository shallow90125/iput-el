"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => router.push("/dashboard"), 1000);
    return () => clearTimeout(id);
  }, []);
  return <Loading />;
}
