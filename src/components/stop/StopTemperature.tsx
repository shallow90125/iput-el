"use client";

import { getTemperature } from "@/utils/get-temperature";
import { postStop } from "@/utils/post-stop";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  uid: string;
  piId: string;
};

export default function StopTemperature(props: Props) {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(async () => {
      const res = await getTemperature(props.piId);

      if (!res) {
        router.push("/dashboard");
        clearInterval(id);
        console.log("b");
        return;
      }

      const newData = res.temperature;
      const oldData = data;
      oldData.splice(0, 1);
      oldData.push(newData);
      setData([...oldData]);

      if (28 <= newData) {
        await postStop(props.piId);
        router.push("/dashboard");
        console.log("a");
        clearInterval(id);
      }
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className=" grid place-items-center gap-4 place-self-stretch p-4">
      <div className=" place-self-stretch pr-12">
        <ResponsiveContainer className=" block place-self-stretch">
          <LineChart
            width={700}
            height={300}
            data={data.map((v, i) => ({
              value: v,
              index:
                i == data.length - 1 ? "現在" : `${data.length - i - 1}秒前`,
            }))}
          >
            <CartesianGrid strokeDasharray="5 1" />
            <XAxis dataKey="index" />
            <YAxis dataKey="value" domain={[0, 40]} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>{data[data.length - 1]}℃</div>
    </div>
  );
}
