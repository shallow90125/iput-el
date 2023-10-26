"use client";

import EditModal from "@/components/EditModal";
import SwitchState from "@/components/SwitchState";
import TimeSelect from "@/components/TimeSelect";
import WeekGroup from "@/components/WeekGroup";
import WeekStatus from "@/components/WeekStatus";
import { Alarm } from "@/types/Alarm";
import { postAlarms } from "@/utils/post-alarms";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

type Props = {
  alarms: Alarm[];
};

export default function Alarms(props: Props) {
  const [alarms, setAlarms] = useState<Alarm[]>(props.alarms);
  const [modalIndex, setModalIndex] = useState(0);
  const [newAlarm, setNewAlarm] = useState<Alarm>({
    hour: 0,
    minute: 0,
    dayOfWeek: [],
    isEnabled: true,
    timezone: "Asia/Tokyo",
  });

  function addAlarm(addedAlarm: Alarm) {
    const newAlarms = alarms;
    newAlarms.push(addedAlarm);
    setAlarms([...newAlarms]);
  }

  function removeAlarm(index: number) {
    const newAlarms = alarms;
    newAlarms.splice(index, 1);
    setAlarms([...newAlarms]);
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col place-content-stretch place-items-center gap-2 place-self-stretch">
      <div className=" place-self-streth flex place-content-stretch gap-2">
        <div className=" flex-grow ">
          <TimeSelect
            onHourChange={(hour) => {
              setNewAlarm((v) => ({ ...v, hour: hour }));
            }}
            onMinuteChange={(minute) => {
              setNewAlarm((v) => ({ ...v, minute: minute }));
            }}
            defaultHour={0}
            defaultMinute={0}
          />
        </div>
        <div className=" grid flex-none place-items-center gap-2">
          <Button onClick={() => addAlarm(newAlarm)}>追加</Button>
          <Button onClick={() => postAlarms(alarms)}>保存</Button>
        </div>
      </div>
      <WeekGroup
        defaultWeek={newAlarm.dayOfWeek}
        onWeekChange={(week) => {
          setNewAlarm((v) => ({ ...v, dayOfWeek: week }));
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
            <div className=" flex flex-col gap-2" key={index}>
              <div className=" flex items-center justify-end gap-2">
                <p className=" grid place-items-center text-4xl">
                  {alarm.hour}:{alarm.minute.toString().padStart(2, "0")}
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setModalIndex(index);
                    onOpen();
                  }}
                >
                  編集
                </Button>
                <SwitchState
                  defaultIsEnabled={alarm.isEnabled}
                  onValueChange={(isEnabled) => {
                    const newAlarms = alarms;
                    newAlarms[index] = {
                      ...newAlarms[index],
                      isEnabled: isEnabled,
                    };
                    setAlarms([...newAlarms]);
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
            onRemove={() => removeAlarm(modalIndex)}
            onSave={(newAlarm) => {
              const newAlarms = alarms;
              newAlarms[modalIndex] = newAlarm;
              setAlarms([...newAlarms]);
            }}
            default={alarms[modalIndex]}
          />
        </div>
      </div>
    </div>
  );
}
