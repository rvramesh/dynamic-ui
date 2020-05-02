import { FormComponentProps } from "@progress/kendo-react-common";
import { FormFieldChildProps } from "./FormFieldChildProps";

interface AutoCompleteProps extends FormFieldChildProps {
  url: string;
  name: string;
  fetchInit?: RequestInit;
  limit?: number;
  isMultiSelect?: boolean;
  textField?: string;
}

export type AutoCompleteFormFieldProps = FormComponentProps & AutoCompleteProps;
