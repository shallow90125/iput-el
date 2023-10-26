import Alarms from "@/components/Alarms";
import Defuse from "@/components/Defuse";
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
  // const alarms = undefined;
  const status = await getStatus();
  return (
    <>
      {alarms && status ? (
        status.isOn ? (
          <Defuse />
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
