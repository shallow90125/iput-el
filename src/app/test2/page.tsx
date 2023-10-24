"use client";

import EditModal from "@/components/EditModal";
import SwitchState from "@/components/SwitchState";
import TimeSelect from "@/components/TimeSelect";
import WeekGroup from "@/components/WeekGroup";
import WeekStatus from "@/components/WeekStatus";
import { Alarm } from "@/types/Alarm";
import { getAlarms } from "@/utils/get-alarms";
import { postAlarms } from "@/utils/post-alarms";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { useEffect, useState, useTransition } from "react";

export default function Test2() {
  const [isInited, setIsInited] = useState<boolean>(false);
  const [saved, setSaved] = useState<Alarm[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [key, setKey] = useState(0);
  const [added, setAdded] = useState<Alarm>({
    hour: 0,
    minute: 0,
    dayOfWeek: [],
    isEnabled: false,
    timezone: "Asia/Tokyo",
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log("aaaaa");
    console.log(alarms.map((a) => a.isEnabled));
    if (!isInited) {
      startTransition(async () => {
        const data = await getAlarms();
        console.log(data);
        if (!data) return;
        setSaved([...data]);
        setAlarms([...data]);
        setIsInited(true);
      });
    }
  }, [alarms, isInited]);

  const addalarm = () => {
    setAlarms((a) => {
      const b = a;
      b.push(added);

      return [...b];
    });
  };

  const deleteItem = (index: number) => {
    const a = alarms;
    a.splice(index, 1);
    setAlarms([...a]);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col place-content-stretch place-items-center gap-2 place-self-stretch">
      <div className=" place-self-streth flex place-content-stretch gap-2">
        <div className=" flex-grow ">
          <TimeSelect
            onHourChange={(hour) => setAdded((v) => ({ ...v, hour: hour }))}
            onMinuteChange={(minute) =>
              setAdded((v) => ({ ...v, minute: minute }))
            }
            defaultHour={0}
            defaultMinute={0}
          />
        </div>
        <div className=" grid flex-none place-items-center gap-2">
          <Button onClick={addalarm}>追加</Button>
          <Button
            onClick={() =>
              startTransition(async () => {
                console.log("post");
                console.log(alarms.map((a) => a.isEnabled));
                await postAlarms(alarms);
              })
            }
          >
            保存
          </Button>
        </div>
      </div>
      <WeekGroup
        defaultWeek={added.dayOfWeek}
        onWeekChange={(week) => {
          setAdded((v) => ({ ...v, dayOfWeek: week }));
        }}
      />
      <Divider />
      <div className=" flex flex-grow flex-col gap-4">
        {alarms
          .sort((a, b) => {
            if (a.hour == b.hour) {
              if (a.minute == b.minute) {
                if (a.dayOfWeek.length == b.dayOfWeek.length) {
                  for (
                    let i = 0;
                    i < a.dayOfWeek.length, i < b.dayOfWeek.length;
                    i++
                  ) {
                    if (a.dayOfWeek[i] != b.dayOfWeek[i]) {
                      return a.dayOfWeek[i] - b.dayOfWeek[i];
                    }
                  }
                  return 0;
                }
                return a.dayOfWeek.length - b.dayOfWeek.length;
              }
              return a.minute - b.minute;
            }
            return a.hour - b.hour;
          })
          .map((alarm, index) => (
            <div className=" flex flex-col gap-2">
              <div className=" flex items-center justify-end gap-2">
                <p className=" grid place-items-center text-4xl">
                  {alarm.hour}:{alarm.minute.toString().padStart(2, "0")}
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setKey(index);
                    onOpen();
                  }}
                >
                  編集
                </Button>
                <SwitchState
                  defaultIsEnabled={alarm.isEnabled}
                  onValueChange={(isEnabled) => {
                    const a = alarms;
                    a[index] = { ...a[index], isEnabled: isEnabled };
                    setAlarms([...a]);
                  }}
                />
              </div>
              <WeekStatus week={alarm.dayOfWeek}></WeekStatus>
            </div>
          ))}

        <div>
          <EditModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onRemove={() => deleteItem(key)}
            onSave={(newAlarm) => {
              const a = alarms;
              a[key] = newAlarm;
              setAlarms([...a]);
            }}
            default={alarms[key]}
          />
        </div>
      </div>
    </div>
  );
}
