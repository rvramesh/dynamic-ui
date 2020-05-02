import { filterBy } from "@progress/kendo-data-query";
import {
  ComboBox as KendoComboBox,
  MultiSelect as KendoMultiSelect,
} from "@progress/kendo-react-dropdowns";
import { FilterChangeEvent } from "@progress/kendo-react-dropdowns/dist/npm/common/events";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { AutoCompleteFormFieldProps } from "../Types/AutoCompleteFormFieldProps";

async function sendQuery(
  url: string,
  init: RequestInit = { method: "GET", headers: { accept: "application/json" } }
) {
  const result = await fetch(url, init);
  const json = await result.json();
  const totalCount = parseInt(result.headers.get("X-Total-Count") ?? "-1", 10);
  const moreDataExist = Array.isArray(result) && result.length < totalCount;
  return { json, moreDataExist };
}

const AutoComplete: FunctionComponent<AutoCompleteFormFieldProps> = (props) => {
  const [searchData, setSearchData] = useState("");
  const [debouncedSearchData] = useDebounce(searchData, 1000);

  //TODO: Handle Error?
  const { status, data } = useQuery(
    [props.name, { queryKey: debouncedSearchData }],
    async () => {
      const query = encodeURIComponent(debouncedSearchData);
      const apiUrl = `${props.url}?${props.name}_like=${query}&_limit=${props.limit}`;
      return await sendQuery(apiUrl, props.fetchInit);
    }
  );

  const [localSearchResult, setLocalSearchResult] = useState(data?.json);

  const modifySearchData = (value: string) => {
    const isMoreDataExistInServer = data?.moreDataExist;
    if (isMoreDataExistInServer) {
      setSearchData(value);
    } else {
      setLocalSearchResult(
        filterBy(data?.json.slice(), {
          field: props.name,
          operator: "contains",
          value: value,
          ignoreCase: true,
        })
      );
    }
  };

  const onFilterChange = (e: FilterChangeEvent<unknown>) => {
    modifySearchData(e.filter.value);
  };

  if (props.isMultiSelect) {
    return (
      <KendoMultiSelect
        {...props}
        filterable={true}
        onFilterChange={onFilterChange}
        onOpen={() => modifySearchData("")}
        data={localSearchResult}
        loading={status === "loading"}
        allowCustom={false}
      />
    );
  } else {
    return (
      <KendoComboBox
        {...props}
        filterable={true}
        onFilterChange={onFilterChange}
        onOpen={() => modifySearchData("")}
        data={localSearchResult}
        loading={status === "loading"}
        allowCustom={false}
      />
    );
  }
};

AutoComplete.defaultProps = {
  limit: 500,
  isMultiSelect: false,
};

export default AutoComplete;
