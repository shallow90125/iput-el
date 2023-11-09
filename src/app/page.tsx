import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" grid place-items-center gap-4">
      <div className=" text-2xl font-bold">アラームアプリです</div>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
