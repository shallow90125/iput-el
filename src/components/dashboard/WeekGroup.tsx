import { weeks } from "@/utils/numbers";
import { CheckboxGroup } from "@nextui-org/checkbox";
import { useEffect, useState } from "react";
import WeekCheckbox from "./WeekCheckbox";

type Props = {
  onWeekChange: (weeks: number[]) => void;
  defaultWeek: number[];
};

export default function WeekGroup(props: Props) {
  const [week, setWeek] = useState<string[]>();
  useEffect(() => {
    setWeek(props.defaultWeek.map((v) => String(v)));
  }, [props.defaultWeek]);
  return (
    <CheckboxGroup
      value={week}
      defaultValue={props.defaultWeek.map((v) => String(v))}
      onChange={(event) => {
        setWeek(event as string[]);
        props.onWeekChange(
          (event as string[])
            .map((v) => Number(v))
            .sort((a, b) => {
              a - b;
              if (a == b) {
                return a - b;
              }
              return a - b;
            }),
        );
      }}
      classNames={{
        base: " p-2 grid place-content-center",
        wrapper: " flex flex-row place-items-center place-content-center",
      }}
    >
      {weeks.map((_, index) => (
        <WeekCheckbox key={index} value={String(index)} />
      ))}
    </CheckboxGroup>
  );
}
