"use client";
import { gettemperture } from "@/utils/get-temperture";
import { stopAlarms } from "@/utils/stop-alarms";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function temperature() {
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const fetchData = () =>
    startTransition(async () => {
      const newData = (await gettemperture()) ?? 0;
      const oldData = data;
      oldData.splice(0, 1);
      oldData.push(newData);
      setData([...oldData]);
      if (28 <= newData) {
        stopAlarms();
        router.push("/dashboard");
      }
    });

  useEffect(() => {
    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
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
