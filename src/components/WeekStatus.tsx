import { weeks } from "@/utils/numbers";

type Props = {
  onValueChange?: boolean;
  week: number[];
};

export default function WeekStatus(props: Props): React.ReactNode {
  if (props.week.length == 7) {
    return <div>毎日</div>;
  }
  if (props.week.length == 0) {
    const date = new Date();
    const day = date.getDate() + 1;
    return <div>{day}日</div>;
  } else {
    return <div>毎週:{props.week.map((v) => weeks[v]).join(", ")}</div>;
  }
}
