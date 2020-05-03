import { Grid } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { ReactQueryConfigProvider } from "react-query";
import MultiSelect from "../../Common/Components/AutoComplete";
import DatePicker from "../../Common/Components/DatePicker";
import FormField from "../../Common/Components/FormField";
import {
  FormFieldChildProps,
  FormFieldValue,
} from "../../Common/Types/FormFieldChildProps";

const queryConfig = { refetchAllOnWindowFocus: false };
const autoComplete = (props: FormFieldChildProps) => {
  return <MultiSelect url="http://localhost:4000/countries" {...props} />;
};
const datePicker = (props: FormFieldChildProps) => {
  return <DatePicker {...props} />;
};

function HomePage() {
  const [select, setSelect] = useState<FormFieldValue>({ text: "India" });
  return (
    <div>
      <ReactQueryConfigProvider config={queryConfig}>
        <Grid container spacing={3}>
          <FormField
            component={autoComplete}
            name="country"
            displayName="Hello World"
            onBlur={() => console.log("blur")}
            onValueChange={(val: FormFieldValue) => {
              setSelect(val);
              console.log(val);
            }}
            value={select}
          />
          <FormField
            component={datePicker}
            name="date"
            displayName="Hello World"
            onBlur={() => console.log("blur")}
            onValueChange={(val: unknown) => console.log(val)}
            value="1/1/2020"
          />
        </Grid>
      </ReactQueryConfigProvider>
    </div>
  );
}

export default HomePage;
