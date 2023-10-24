import { Switch } from "@nextui-org/react";

type Props = {
  onValueChange: (isEnabled: boolean) => void;
  defaultIsEnabled: boolean;
};

export default function SwitchState(props: Props) {
  console.log(props.defaultIsEnabled);
  return (
    <Switch
      className=" z-0"
      defaultSelected={props.defaultIsEnabled}
      onValueChange={(isEnabled) => props.onValueChange(isEnabled)}
    ></Switch>
  );
}
