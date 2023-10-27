"use client";

import { Switch } from "@nextui-org/react";

type Props = {
  onValueChange: (isEnabled: boolean) => void;
  isSelected: boolean;
};

export default function SwitchState(props: Props) {
  return (
    <Switch
      className=" z-0"
      isSelected={props.isSelected}
      onValueChange={(isEnabled) => props.onValueChange(isEnabled)}
    ></Switch>
  );
}
