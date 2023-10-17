"use client";

import TimeSelect from "@/components/TimeSelect";
import WeekGroup from "@/components/WeekGroup";
import { Alarm } from "@/types/Alarm";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (alarm: Alarm) => void;
  onRemove: () => void;
  default: Alarm;
};

export default function EditModal(props: Props): React.ReactNode {
  const [alarm, setAlarm] = useState<Alarm>({ hour: 0, minute: 0, week: [] });
  useEffect(() => {
    setAlarm(props.default);
  }, [props.default]);

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">編集</ModalHeader>

            <ModalBody>
              <div>
                <TimeSelect
                  onHourChange={(hour) =>
                    setAlarm((v) => ({ ...v, hour: hour }))
                  }
                  onMinuteChange={(minute) =>
                    setAlarm((v) => ({ ...v, minute: minute }))
                  }
                  defaultHour={props.default.hour}
                  defaultMinute={props.default.minute}
                />
              </div>
              <WeekGroup
                defaultWeek={props.default.week}
                onWeekChange={(week) => {
                  setAlarm((v) => ({ ...v, week: week }));
                }}
              />
            </ModalBody>
            <ModalFooter className=" flex gap-2">
              <div className=" grid flex-grow justify-start">
                <Button
                  color="danger"
                  variant="bordered"
                  onClick={() => {
                    onClose();
                    props.onRemove();
                  }}
                >
                  削除
                </Button>
              </div>
              <Button onClick={onClose}>Close</Button>
              <Button
                color="primary"
                onClick={() => {
                  props.onSave(alarm);
                  onClose();
                }}
              >
                変更
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </ModalContent>
    </Modal>
  );
}
