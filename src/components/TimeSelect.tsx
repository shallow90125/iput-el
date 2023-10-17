import { hour, minute } from "@/app/test2/time";
import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  onHourChange: (hour: number) => void;
  defaultHour: number;
  onMinuteChange: (minute: number) => void;
  defaultMinute: number;
};

export default function TimeSelect(props: Props): React.ReactNode {
  return (
    <div className=" flex flex-none gap-2">
      <Select
        label="時"
        onChange={(event) => props.onHourChange(Number(event.target.value))}
        defaultSelectedKeys={[props.defaultHour.toString()]}
      >
        {hour.map((time) => (
          <SelectItem key={time.value} value={time.value}>
            {time.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="分"
        onChange={(event) => props.onMinuteChange(Number(event.target.value))}
        defaultSelectedKeys={[props.defaultMinute.toString()]}
      >
        {minute.map((time) => (
          <SelectItem key={time.value} value={time.value}>
            {time.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
