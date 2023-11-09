import Alarms from "@/components/dashboard/Alarms";
import NotConnected from "@/components/dashboard/NotConnected";
import Redirect from "@/components/Redirect";
import { getAlarms } from "@/utils/get-alarms";
import { getUser } from "@/utils/get-user";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);
  const user = await getUser(session?.user.uid);
  const alarms = await getAlarms(user?.piId);

  return user ? (
    user.on ? (
      <Redirect href="/stop" />
    ) : (
      <Alarms alarms={alarms ?? []} piId={user.piId} />
    )
  ) : (
    <NotConnected uid={session?.user.uid} />
  );
}
