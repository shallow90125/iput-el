"use client";

import { Mode } from "@/types/PiDoc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  mode: Mode;
};

export default function Redirect(props: Props) {
  const router = useRouter();

  useEffect(() => {
    router.push("/stop/" + props.mode);
  }, []);

  return <></>;
}
