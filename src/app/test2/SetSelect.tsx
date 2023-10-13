"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { hour, minute } from "./time";

type Alarm = {
  hour: string;
  minute: string;
};

type Props = {
  alarm: Alarm[];
  setAlarm: Dispatch<SetStateAction<Alarm[]>>;
  key: number;
};

export default function SetSelect(props: Props): React.ReactNode {
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");
  // const [alarm, setAlarm] = useState<{ hour: string; minute: string }[]>([]);

  return (
    <div className="flex w-full">
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
      {props.alarm.map((item, index) => (
        <p className="mb-3 mr-10">
          <p className="text-4xl">
            {item.hour}：{item.minute}
            {/* <p>{index}</p> */}
          </p>
        </p>
      ))}
    </div>
  );
}
