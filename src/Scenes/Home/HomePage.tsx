import { Grid } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { ReactQueryConfigProvider } from "react-query";
import AutoCompleteMultiSelect from "../../Common/Components/AutoCompleteMultiSelect";
import DatePicker from "../../Common/Components/DatePicker";
import FormField from "../../Common/Components/FormField";
import TextBox from "../../Common/Components/TextBox";
import {
  FormFieldChildProps,
  FormFieldValue,
} from "../../Common/Types/FormFieldChildProps";

const queryConfig = { refetchAllOnWindowFocus: false };
const autoComplete = (props: FormFieldChildProps) => {
  return (
    <AutoCompleteMultiSelect url="http://localhost:4000/countries" {...props} />
  );
};
const datePicker = (props: FormFieldChildProps) => {
  return <DatePicker {...props} />;
};

const textBox = (props: FormFieldChildProps) => {
  return <TextBox {...props} />;
};

function HomePage() {
  const [select, setSelect] = useState<FormFieldValue>([
    { text: "India" },
    { text: "United Kingdom" },
  ]);
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
            }}
            value={select}
            type="Select"
          />
          <FormField
            component={datePicker}
            name="date"
            displayName="Hello World"
            onBlur={() => console.log("blur")}
            onValueChange={(val: unknown) => console.log(val)}
            type="DateTime"
          />
          <FormField
            component={textBox}
            name="city"
            displayName="Hello World"
            onBlur={() => console.log("blur")}
            onValueChange={(val: unknown) => console.log(val)}
            type="TextBox"
          />
        </Grid>
      </ReactQueryConfigProvider>
    </div>
  );
}

export default HomePage;
