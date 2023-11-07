"use client";

import EditModal from "@/components/dashboard/EditModal";
import SwitchState from "@/components/dashboard/SwitchState";
import TimeSelect from "@/components/dashboard/TimeSelect";
import WeekGroup from "@/components/dashboard/WeekGroup";
import WeekStatus from "@/components/dashboard/WeekStatus";
import { Alarm } from "@/types/Alarm";
import { postAlarms } from "@/utils/post-alarms";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

type Props = {
  alarms: Alarm[];
  piId: string;
};

export default function Alarms(props: Props) {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [alarms, setAlarms] = useState<Alarm[]>([...props.alarms]);
  const [modalIndex, setModalIndex] = useState(0);
  const [newAlarm, setNewAlarm] = useState<Alarm>({
    hour: 0,
    minute: 0,
    dayOfWeek: [],
    isEnabled: true,
    timezone: "Asia/Tokyo",
  });

  const [isPending, startTransition] = useTransition();

  function addAlarm(addedAlarm: Alarm) {
    const newAlarms = alarms;
    newAlarms.push(addedAlarm);
    setAlarms([...newAlarms]);
    setIsEdited(true);
  }

  function removeAlarm(index: number) {
    const newAlarms = alarms;
    newAlarms.splice(index, 1);
    setAlarms([...newAlarms]);
    setIsEdited(true);
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col place-content-stretch place-items-center gap-4 place-self-stretch">
      <div className=" grid gap-2">
        <div className=" flex place-items-center gap-2">
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
          <Button onClick={() => addAlarm(newAlarm)}>追加</Button>
        </div>
        <WeekGroup
          defaultWeek={newAlarm.dayOfWeek}
          onWeekChange={(week) => {
            setNewAlarm((v) => ({ ...v, dayOfWeek: week }));
          }}
        />
      </div>
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
                  isSelected={alarm.isEnabled}
                  onValueChange={(isEnabled) => {
                    const newAlarms = alarms;
                    newAlarms[index] = {
                      ...newAlarms[index],
                      isEnabled: isEnabled,
                    };
                    setAlarms([...newAlarms]);
                    setIsEdited(true);
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
            onRemove={() => {
              removeAlarm(modalIndex);
              setIsEdited(true);
            }}
            onSave={(newAlarm) => {
              const newAlarms = alarms;
              newAlarms[modalIndex] = newAlarm;
              setAlarms([...newAlarms]);
              setIsEdited(true);
            }}
            default={alarms[modalIndex]}
          />
        </div>
      </div>
      {isEdited && (
        <div className=" sticky bottom-20 right-0 grid w-full place-content-center">
          <Card className=" animate-slide-in-bottom ease-in">
            <CardBody className=" flex flex-row flex-wrap place-content-center place-items-center gap-4">
              <div>保存されていない変更があります</div>
              <div className=" flex gap-4">
                <Button
                  onClick={() => {
                    setAlarms([...props.alarms]);
                    setIsEdited(false);
                  }}
                  variant="bordered"
                  color="primary"
                >
                  破棄
                </Button>
                {isPending ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={() => {
                      startTransition(async () => {
                        const ok = await postAlarms(alarms, props.piId);
                        if (ok) {
                          setIsEdited(false);
                          toast("保存に成功しました");
                        } else {
                          toast("保存に失敗しました");
                        }
                      });
                    }}
                  >
                    保存
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
