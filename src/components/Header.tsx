import { Button } from "@nextui-org/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserField from "./UserField";

export default async function Header() {
  const session = await getServerSession();
  return (
    <header className=" sticky top-0 z-10 flex h-16 flex-none place-items-center gap-4 border-b border-divider p-3 pl-5">
      <div className=" flex-none">
        <Link
          href="/"
          className=" bg-gradient-to-t from-primary from-25% to-white bg-clip-text text-xl font-bold text-transparent"
        >
          Header
        </Link>
      </div>
      <div className=" flex-grow"></div>
      <div className=" flex-none">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
      <div className=" flex-none">
        <UserField session={session} />
      </div>
    </header>
  );
}
