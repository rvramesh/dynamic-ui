import { FormComponentProps } from "@progress/kendo-react-common";

export type AutoCompleteProps = FormComponentProps & {
  url: string;
  name: string;
  fetchInit?: RequestInit;
  limit?: number;
  isMultiSelect?: boolean;
  textField?: string;
};
