"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  path: Path;
};

export default function Redirect(props: Props) {
  const router = useRouter();

  useEffect(() => {
    router.push("/stop" + props.path);
  }, []);

  return <></>;
}
