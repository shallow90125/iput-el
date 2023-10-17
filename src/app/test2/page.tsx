"use client";

import EditModal from "@/components/EditModal";
import TimeSelect from "@/components/TimeSelect";
import WeekGroup from "@/components/WeekGroup";
import { Alarm } from "@/types/Alarm";
import { Button, Divider, Switch, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export default function Test2() {
  const [alarm, setAlarm] = useState<Alarm[]>([]);
  const [key, setKey] = useState(0);
  const [added, setAdded] = useState<Alarm>({ hour: 0, minute: 0, week: [] });

  const addalarm = () => {
    setAlarm((a) => {
      const b = a;
      b.push(added);

      return [
        ...b.sort((a, b) => {
          a.hour - b.hour;
          if (a.hour == b.hour) {
            return a.minute - b.minute;
          }
          return a.hour - b.hour;
        }),
      ];
    });
  };

  const deleteItem = (index: number) => {
    const a = alarm;
    a.splice(index, 1);
    setAlarm([...a]);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col place-content-stretch place-items-center gap-2 place-self-stretch">
      <div className=" flex gap-2 place-self-stretch">
        <div className=" flex-grow">
          <TimeSelect
            onHourChange={(hour) => setAdded((v) => ({ ...v, hour: hour }))}
            onMinuteChange={(minute) =>
              setAdded((v) => ({ ...v, minute: minute }))
            }
            defaultHour={0}
            defaultMinute={0}
          />
        </div>
        <div className=" grid flex-none place-items-center">
          <Button onClick={addalarm}>追加</Button>
        </div>
      </div>
      <WeekGroup
        defaultWeek={added.week}
        onWeekChange={(week) => {
          console.log(week);
          setAdded((v) => ({ ...v, week: week }));
        }}
      />
      <Divider />
      <div className=" flex flex-grow flex-col gap-4">
        {alarm.map((item, index) => (
          <div className=" flex justify-end gap-4">
            <p className=" grid place-items-center text-4xl">
              {item.hour}:{item.minute.toString().padStart(2, "0")}
            </p>

            <Switch defaultSelected aria-label="Automatic updates" />
            <Button
              onClick={() => {
                setKey(index);
                console.log(item);
                onOpen();
              }}
            >
              編集
            </Button>
          </div>
        ))}
        <div>
          <EditModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onRemove={() => deleteItem(key)}
            onSave={(newAlarm) => {
              const a = alarm;
              a[key] = newAlarm;
              setAlarm([...a]);
            }}
            default={alarm[key]}
          />
        </div>
      </div>
    </div>
  );
}
