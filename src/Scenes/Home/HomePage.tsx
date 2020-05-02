import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import MultiSelect from "../../Common/Components/AutoComplete";

const queryConfig = { refetchAllOnWindowFocus: false };

function HomePage() {
  return (
    <div>
      <ReactQueryConfigProvider config={queryConfig}>
        <MultiSelect
          url="http://localhost:4000/countries"
          textField="country"
          name="country"
        />
      </ReactQueryConfigProvider>
    </div>
  );
}

export default HomePage;
