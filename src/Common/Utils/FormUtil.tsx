import AutoComplete from "../Components/AutoComplete";
import AutoCompleteMultiSelect from "../Components/AutoCompleteMultiSelect";
import CheckBox from "../Components/CheckBox";
import DatePicker from "../Components/DatePicker";
import DateRangePicker from "../Components/DateRangePicker";
import DateTimePicker from "../Components/DateTimePicker";
import FieldSet from "../Components/FieldSet";
import MaskedTextBox from "../Components/MaskedTextBox";
import NumericTextBox from "../Components/NumericTextBox";
import TextBox from "../Components/TextBox";
import TimePicker from "../Components/TimePicker";

export const FieldMapping = {
  TextBox: TextBox,
  Select: AutoComplete,
  MultiSelect: AutoCompleteMultiSelect,
  Date: DatePicker,
  DateTime: DateTimePicker,
  Time: TimePicker,
  DateRange: DateRangePicker,
  MaskedTextBox: MaskedTextBox,
  NumericTextBox: NumericTextBox,
  CheckBox: CheckBox,
  FieldSet: FieldSet,
};
