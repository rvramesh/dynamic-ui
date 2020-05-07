import AutoComplete from "../Components/AutoComplete";
import AutoCompleteMultiSelect from "../Components/AutoCompleteMultiSelect";
import CheckBox from "../Components/CheckBox";
import DatePicker from "../Components/DatePicker";
import DateRangePicker from "../Components/DateRangePicker";
import DateTimePicker from "../Components/DateTimePicker";
import FormFieldSet from "../Components/FormFieldSet";
import MaskedTextBox from "../Components/MaskedTextBox";
import NumericTextBox from "../Components/NumericTextBox";
import TextBox from "../Components/TextBox";
import TimePicker from "../Components/TimePicker";
import { FieldValidator, FormFieldType } from "../Types/FormFieldChildProps";
import { isAutoCompleteMultiSelectValid } from "../Validators/isAutoCompleteMultiSelectValid";
import { isAutoCompleteValid } from "../Validators/isAutoCompleteValid";
import { isCheckBoxValid } from "../Validators/isCheckBoxValid";
import { isDateFieldValid } from "../Validators/isDateFieldValid";
import { isDateRangeFieldValid } from "../Validators/isDateRangeValid";
import { isNumericTextBoxValid } from "../Validators/isNumericTextBoxValid";
import { isTextFieldValid } from "../Validators/isTextFieldValid";
import { isTimeFieldValid } from "../Validators/isTimeFieldValue";

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
  FieldSet: FormFieldSet,
};

export const FieldValidatorMapping: { [k in FormFieldType]: FieldValidator } = {
  TextBox: isTextFieldValid,
  Select: isAutoCompleteValid,
  MultiSelect: isAutoCompleteMultiSelectValid,
  Date: isDateFieldValid,
  DateTime: isDateFieldValid,
  Time: isTimeFieldValid,
  DateRange: isDateRangeFieldValid,
  MaskedTextBox: isTextFieldValid,
  NumericTextBox: isNumericTextBoxValid,
  CheckBox: isCheckBoxValid,
  FieldSet: (rules, formValue) => {
    return {
      valid: true,
    };
  },
};
