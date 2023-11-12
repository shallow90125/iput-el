import Redirect from "@/components/Redirect";
import StopButton from "@/components/stop/StopButton";
import StopTemperature from "@/components/stop/StopTemperature";
import { getUser } from "@/utils/get-user";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function Stop() {
  const session = await getServerSession(nextAuthOptions);
  const user = await getUser(session?.user.uid);

  return user ? (
    user.mode == "button" ? (
      <StopButton uid={user.uid} piId={user.piId} />
    ) : (
      <StopTemperature uid={user.uid} piId={user.piId} />
    )
  ) : (
    <Redirect href="/dashboard" />
  );
}
