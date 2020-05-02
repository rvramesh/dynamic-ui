import { FormComponentProps } from "@progress/kendo-react-common";
import { FormFieldProps } from "./FormFieldProps";

interface AutoCompleteProps extends FormFieldProps {
  url: string;
  name: string;
  fetchInit?: RequestInit;
  limit?: number;
  isMultiSelect?: boolean;
  textField?: string;
}

export type AutoCompleteFormFieldProps = FormComponentProps & AutoCompleteProps;
