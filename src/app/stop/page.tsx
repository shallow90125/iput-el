import Redirect from "@/components/Redirect";
import StopButton from "@/components/stop/StopButton";
import StopTemperature from "@/components/stop/StopTemperature";
import { getUser } from "@/utils/get-user";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getServerSession } from "next-auth";

export default async function Stop() {
  const session = await getServerSession(nextAuthOptions);
  const user = await getUser(session?.user.uid);

  return user ? (
    (() => {
      if (user.mode == "button")
        return <StopButton uid={user.uid} piId={user.piId} />;
      if (user.mode == "temperature")
        return <StopTemperature uid={user.uid} piId={user.piId} />;
    })()
  ) : (
    <Redirect href="/dashboard" />
  );
}
