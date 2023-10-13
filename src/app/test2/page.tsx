"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
// import {Button} from "@nextui-org/button";
import { useState } from "react";
import { hour, minute } from "./time";

export default function App() {
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");
  const [alarm, setAlarm] = useState<{ hour: string; minute: string }[]>([]);

  const addalarm = () => {
    setAlarm([...alarm, { hour: state, minute: state2 }]);
    console.log(alarm);
  };

  const deleteItem = (index: number) => {
    const a = alarm;
    a.splice(index, 1);
    setAlarm([...a]);
    // console.log(a);
  };

  // useEffect(() => {}, [alarm]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-full w-full">
      <div className="flex">
        <Select
          label="時"
          className="mb-4 max-w-xs"
          onChange={(event) => setState(event.target.value)}
        >
          {hour.map((time) => (
            <SelectItem key={time.value} value={time.value}>
              {time.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="分"
          className="mb-4 max-w-xs"
          onChange={(event) => setState2(event.target.value)}
        >
          {minute.map((time) => (
            <SelectItem key={time.value} value={time.value}>
              {time.label}
            </SelectItem>
          ))}
        </Select>
        <Button onClick={addalarm}>追加</Button>
      </div>
      {alarm.map((item, index) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className="mb-3 mr-10">
            <p className="text-4xl">
              {item.hour}：{item.minute}
              {/* <p>{index}</p> */}
            </p>
          </p>
          <Switch defaultSelected aria-label="Automatic updates" />
          <Button onClick={() => deleteItem(index)}>削除</Button>
          <Button onPress={onOpen}>編集</Button>
        </div>
      ))}
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">編集</ModalHeader>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
