import {
  DateInput as KendoDateInput,
  DateInputProps as KendoDateInputProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";

type DateInputProps = KendoDateInputProps;
function WrappedDateInput(props: DateInputProps) {
  const inputEl = React.useRef<KendoDateInput>(null);
  React.useLayoutEffect(() => {
    const { current }: { current: any } = inputEl;

    const handleBlur = () => {
      if (current && current.value === null) {
        current.kendoDate.typedMonthPart = "";
        current.kendoDate.setValue(null);
        const textAndFormat = current.kendoDate.getTextAndFormat();
        current.element.value = textAndFormat.text;
        current.currentFormat = textAndFormat.format;
      }
      console.log("blur");
    };

    current.element.addEventListener("blur", handleBlur);

    return () => {
      current.element.removeEventListener("blur", handleBlur);
    };
  }, [inputEl]);
  return <KendoDateInput {...props} ref={inputEl} />;
}

export default WrappedDateInput;
