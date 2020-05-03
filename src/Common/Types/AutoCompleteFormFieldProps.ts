import { FormFieldChildProps } from "./FormFieldChildProps";

interface AutoCompleteProps extends FormFieldChildProps {
  url: string;
  name: string;
  fetchInit?: RequestInit;
  limit?: number;
  isMultiSelect?: boolean;
  textField?: string;
}

export type AutoCompleteFormFieldProps = FormFieldChildProps &
  AutoCompleteProps;