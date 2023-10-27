import { hours, minutes } from "@/utils/numbers";
import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  onHourChange: (hour: number) => void;
  defaultHour: number;
  onMinuteChange: (minute: number) => void;
  defaultMinute: number;
};

export default function TimeSelect(props: Props): React.ReactNode {
  return (
    <div className=" flex w-48 gap-2">
      <Select
        classNames={{ label: " z-0" }}
        label="時"
        items={hours.map((hour) => ({ value: hour }))}
        onChange={(event) => props.onHourChange(Number(event.target.value))}
        defaultSelectedKeys={[props.defaultHour.toString()]}
      >
        {(hour) => (
          <SelectItem key={hour.value} value={hour.value}>
            {hour.value.toString()}
          </SelectItem>
        )}
      </Select>
      <Select
        classNames={{ label: " z-0" }}
        label="分"
        items={minutes.map((minute) => ({ value: minute }))}
        onChange={(event) => props.onMinuteChange(Number(event.target.value))}
        defaultSelectedKeys={[props.defaultMinute.toString()]}
      >
        {(minute) => (
          <SelectItem key={minute.value} value={minute.value}>
            {minute.value.toString()}
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
