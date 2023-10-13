"use client";

import TimeSelect from "@/components/TimeSelect";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Alarm = {
  hour: number;
  minute: number;
};

type Props = {
  alarm: Alarm[];
  index: number;
  setAlarm: Dispatch<SetStateAction<Alarm[]>>;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
};

export default function EditModal(props: Props): React.ReactNode {
  const [state, setState] = useState<Alarm>({ hour: 0, minute: 0 });
  useEffect(() => {
    setState(props.alarm[props.index]);
    console.log(state);
  }, [props.alarm, props.index]);
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">編集</ModalHeader>

            <ModalFooter>
              <TimeSelect
                onChange={(event) =>
                  setState(
                    (v) =>
                      ({
                        hour: Number(event.target.value),
                        minute: v?.minute,
                      }) as Alarm,
                  )
                }
                onChange2={(event) =>
                  setState(
                    (v) =>
                      ({
                        hour: v?.hour,
                        minute: Number(event.target.value),
                      }) as Alarm,
                  )
                }
                defaultSelectedKeys={[
                  props.alarm[props.index].hour.toString() ?? 0,
                ]}
                defaultSelectedKeys2={[
                  props.alarm[props.index].minute.toString() ?? 0,
                ]}
              />
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
