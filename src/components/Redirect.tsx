"use client";

import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  href: string;
};

export default function Redirect(props: Props) {
  const router = useRouter();

  useEffect(() => {
    router.push(props.href);
  }, []);

  return <Loading />;
}
