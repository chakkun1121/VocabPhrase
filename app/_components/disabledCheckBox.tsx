import { FaCheck } from "react-icons/fa";

export function DisabledCheckBox({
  checked,
  className,
}: {
  checked: boolean;
  className?: string;
}) {
  return (
    <div
      className={
        className +
        " border rounded grid place-items-center " +
        (checked ? "bg-BahamaBlue-400" : "bg-gray-50")
      }
    >
      {checked && <FaCheck className="text-gray-50 w-3/4 h-3/4" />}
    </div>
  );
}
