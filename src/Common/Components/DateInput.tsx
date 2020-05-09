import {
  DateInput as KendoDateInput,
  DateInputProps as KendoDateInputProps,
} from "@progress/kendo-react-dateinputs";
import * as React from "react";

function WrappedDateInput(props: KendoDateInputProps) {
  return <KendoDateInput {...props} disabled={true} />;
}

export default WrappedDateInput;
