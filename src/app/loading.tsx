import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className=" grid flex-grow place-items-center place-self-stretch">
      <Spinner color="primary" />
    </div>
  );
}
