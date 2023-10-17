import { weeks } from "@/utils/numbers";
import {
  CheckboxProps,
  VisuallyHidden,
  tv,
  useCheckbox,
} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: " rounded-full w-8 h-8 grid place-items-center border border-divider transition bg-primary-foreground",
  },
  variants: {
    isSelected: {
      true: "bg-primary text-black",
    },
    isFocusVisible: {
      true: "z-10 outline-2 outline-offset-2 outline-focus",
    },
  },
});

export default function WeekCheckbox(props: CheckboxProps) {
  const { getBaseProps, getInputProps, getLabelProps, isSelected } =
    useCheckbox({ ...props });

  const styles = checkbox({ isSelected });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div {...getLabelProps()} className={styles.base()}>
        {weeks[Number(props.value)]}
      </div>
    </label>
  );
}
