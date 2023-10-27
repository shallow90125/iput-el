import Alarms from "@/components/dashboard/Alarms";
import Redirect from "@/components/Redirect";
import { getAlarms } from "@/utils/get-alarms";
import { getStatus } from "@/utils/get-status";
import { getUserDoc } from "@/utils/get-user-doc";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();
  const user = await getUserDoc(session?.user.uid);
  const alarms = await getAlarms();
  const status = await getStatus();
  return (
    <>
      {alarms && status ? (
        status.isOn ? (
          <Redirect path={status.path} />
        ) : (
          <Alarms alarms={alarms} />
        )
      ) : (
        <div className=" grid place-items-center gap-4">
          <div>アラームと接続できません！</div>
          <Input type="url" label="URL" />
          <Button>更新</Button>
        </div>
      )}
    </>
  );
}
