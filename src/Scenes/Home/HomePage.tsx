import { Grid } from "@material-ui/core";
import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import MultiSelect from "../../Common/Components/AutoComplete";
import FormField from "../../Common/Components/FormField";

const queryConfig = { refetchAllOnWindowFocus: false };
const innerChild = ({ id, name }: any) => (
  <MultiSelect
    url="http://localhost:4000/countries"
    textField="country"
    name={name}
    id={id}
  />
);

function HomePage() {
  return (
    <div>
      <ReactQueryConfigProvider config={queryConfig}>
        <Grid container spacing={3}>
          <FormField
            component={innerChild}
            name="country"
            displayName="Hello World"
          ></FormField>
        </Grid>
      </ReactQueryConfigProvider>
    </div>
  );
}

export default HomePage;
