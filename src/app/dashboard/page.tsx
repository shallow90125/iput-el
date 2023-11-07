import Alarms from "@/components/dashboard/Alarms";
import NotConnected from "@/components/dashboard/NotConnected";
import Redirect from "@/components/Redirect";
import { getUser } from "@/utils/get-user";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);
  const user = await getUser(session?.user.uid);

  return user ? (
    user.on ? (
      <Redirect mode={user.mode} />
    ) : (
      <Alarms alarms={user.alarms} piId={user.piId} />
    )
  ) : (
    <NotConnected uid={session?.user.uid ?? ""} />
  );
}
