"use client";

import TimeSelect from "@/components/TimeSelect";
import { Button, Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SetCheckbox from "./SetCheckbox";

type Alarm = {
  hour: number;
  minute: number;
  week: number[];
};

// React.SetStateAction

type Props = {
  alarm: Alarm[];
  index: number;
  setAlarm: Dispatch<SetStateAction<Alarm[]>>;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
};

export default function EditModal(props: Props): React.ReactNode {
  const [state, setState] = useState<Alarm>({ hour: 0, minute: 0, week: [] });
  useEffect(() => {
    setState(props.alarm[props.index]);
    // console.log(state);
  }, [props.alarm, props.index]);

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">編集</ModalHeader>
            <TimeSelect
              onChange={(event) =>
                setState((v) => ({
                  hour: Number(event.target.value),
                  minute: v.minute,
                  week: v.week,
                }))
              }
              onChange2={(event) =>
                setState((v) => ({
                  hour: v.hour,
                  minute: Number(event.target.value),
                  week: v.week,
                }))
              }
              defaultSelectedKeys={[
                props.alarm[props.index].hour.toString() ?? 0,
              ]}
              defaultSelectedKeys2={[
                props.alarm[props.index].minute.toString() ?? 0,
              ]}
            />
            <SetCheckbox></SetCheckbox>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => {
                const a = props.alarm;
                a[props.index] = state;
                props.setAlarm([
                  ...a.sort((a, b) => {
                    a.hour - b.hour;
                    if (a.hour == b.hour) {
                      return a.minute - b.minute;
                    }
                    return a.hour - b.hour;
                  }),
                ]);
                onClose();
              }}
            >
              変更
            </Button>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
