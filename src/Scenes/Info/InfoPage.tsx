import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import MultiSelect from "../../Common/Components/AutoComplete";

const queryConfig = { refetchAllOnWindowFocus: false };

function InfoPage() {
  return (
    <div>
      <ReactQueryConfigProvider config={queryConfig}>
        <MultiSelect
          url="http://localhost:4000/countries"
          textField="country"
          name="country"
          isMultiSelect={true}
          id="country"
        />
      </ReactQueryConfigProvider>
    </div>
  );
}

export default InfoPage;
