import { FormFieldChildProps } from "./FormFieldChildProps";

interface AutoCompleteProps extends FormFieldChildProps {
  url?: string;
  entity?: string;
  fetchInit?: RequestInit;
  limit?: number;
  textField?: string;
}

export type AutoCompleteFormFieldProps = FormFieldChildProps &
  AutoCompleteProps;
