import { filterBy } from "@progress/kendo-data-query";
import { ComboBox as KendoComboBox } from "@progress/kendo-react-dropdowns";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { AnyQueryKey } from "react-query/types";
import { useDebounce } from "use-debounce";
import { AutoCompleteFormFieldProps } from "../Types/AutoCompleteFormFieldProps";
import { useDropDownQuery } from "../Utils/NetworkUtil";
import { buildUrl } from "../Utils/UrlUtil";

const AutoComplete: FunctionComponent<AutoCompleteFormFieldProps> = (props) => {
  const [searchData, setSearchData] = useState("");
  const [debouncedSearchData] = useDebounce(searchData, 1000);

  const key = props.textField ?? props.entity;
  const queryKey: false | AnyQueryKey = key !== undefined && [
    key,
    { queryKey: debouncedSearchData },
  ];
  //TODO: Handle Error?

  const { status, data } = useDropDownQuery(
    queryKey,
    debouncedSearchData,
    buildUrl(props.url, props.entity),
    props.limit,
    props.fetchInit
  );

  console.log("render", data);
  const [localSearchResult, setLocalSearchResult] = useState(data?.json);

  const doSearch = (value: string) => {
    const isMoreDataExistInServer = data?.moreDataExist;
    if (isMoreDataExistInServer) {
      setSearchData(value);
    } else {
      setLocalSearchResult(
        filterBy(data?.json.slice(), {
          field: "text",
          operator: "contains",
          value: value,
          ignoreCase: true,
        })
      );
    }
  };
  console.log("Renderin autocomplete", props.value);
  return (
    <KendoComboBox
      {...props}
      onChange={(e) => props.onValueChange(e.value)}
      filterable={true}
      onFilterChange={(e) => doSearch(e.filter.value)}
      onOpen={() => doSearch("")}
      data={localSearchResult}
      loading={status === "loading"}
      disabled={status === "loading"}
      allowCustom={false}
      value={
        props.value
          ? Array.isArray(props.value)
            ? props.value[0]
            : props.value
          : null
      }
      textField="text"
      style={{ width: "100%" }}
    />
  );
};

AutoComplete.defaultProps = {
  limit: 500,
};

export default AutoComplete;
