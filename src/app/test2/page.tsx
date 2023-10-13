"use client";
import { Button, Switch, useDisclosure } from "@nextui-org/react";
// import {Button} from "@nextui-org/button";
import TimeSelect from "@/components/TimeSelect";
import { useState } from "react";
import EditModal from "./EditModal";

export default function App() {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(0);
  const [alarm, setAlarm] = useState<{ hour: number; minute: number }[]>([]);
  const [key, setKey] = useState(0);

  const addalarm = () => {
    setAlarm((a) => {
      // const b = [...a, { hour: state, minute: state2 }];

      const b = a;
      b.push({ hour: state, minute: state2 });

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
    // console.log(a);
  };

  // useEffect(() => {}, [alarm]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-full w-full">
      <div className="flex">
        <TimeSelect
          onChange={(event) => setState(Number(event.target.value))}
          onChange2={(event) => setState2(Number(event.target.value))}
        />
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
          <Button
            onPress={() => {
              setKey(index);
              setAlarm([...alarm]);
              onOpen();
            }}
          >
            編集
          </Button>
        </div>
      ))}
      <div>
        <EditModal
          alarm={alarm}
          setAlarm={setAlarm}
          index={key}
          onOpen={onOpen}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    </div>
  );
}
