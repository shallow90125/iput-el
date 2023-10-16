"use client";
import { CheckboxGroup } from "@nextui-org/react";
import React, { Key } from "react";
import { CustomCheckbox } from "./CustomCheckbox";

type Props = {
  onChange3?: React.FormEvent<HTMLDivElement>;
  defaultSelectedKeys3?: Iterable<Key> | "all" | undefined;
};

export default function App(props: Props) {
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

  const week = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="flex w-full flex-col gap-1">
      <CheckboxGroup
        className="gap-1"
        orientation="horizontal"
        value={groupSelected}
        onChange={(event) => {
          const a = event as string[];
          const sortedValues = [...a].sort();
          setGroupSelected(sortedValues);
        }}
      >
        {/* <CustomCheckbox label="a" value="1">
          月
        </CustomCheckbox>
        <CustomCheckbox label="b" value="2">
          火
        </CustomCheckbox>
        <CustomCheckbox label="c" value="3">
          水
        </CustomCheckbox>
        <CustomCheckbox label="d" value="4">
          木
        </CustomCheckbox>
        <CustomCheckbox label="e" value="5">
          金
        </CustomCheckbox>
        <CustomCheckbox label="f" value="6">
          土
        </CustomCheckbox>
        <CustomCheckbox label="g" value="0">
          日
        </CustomCheckbox> */}
        {week.map((value, index) => (
          <CustomCheckbox value={index.toString()}>{value}</CustomCheckbox>
        ))}
      </CheckboxGroup>
      <p className="ml-1 mt-4 text-default-500">
        Selected: {groupSelected.map((key) => week[Number(key)]).join(", ")}
      </p>
    </div>
  );
}
