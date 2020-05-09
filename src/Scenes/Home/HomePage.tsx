import { Grid } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import AutoCompleteMultiSelect from "../../Common/Components/AutoCompleteMultiSelect";
import {
  FormFieldChildProps,
  FormFieldValue,
} from "../../Common/Types/FormFieldChildProps";

const autoComplete = (props: FormFieldChildProps) => {
  return (
    <AutoCompleteMultiSelect url="http://localhost:4000/countries" {...props} />
  );
};

function HomePage() {
  const [select, setSelect] = useState<FormFieldValue>([
    { text: "India" },
    { text: "United Kingdom" },
  ]);

  return (
    <div>
      <Grid container spacing={1}>
        {/* <DynamicForm>
          <FormField
            name="country"
            displayName="Country"
            type="Select"
            entity="countries"
            url="http://localhost:4000/"
          />

          <FormField
            name="state"
            displayName="Hello World"
            type="Select"
            entity="states"
            url="http://localhost:4000/"
          />
          <FormField name="date" displayName="Hello World" type="Date" />
          <FormField
            name="datetime"
            displayName="Hello World"
            type="DateTime"
          />
          <FormFieldSet avoidPadLeft={true} name="set2" max={2} type="FieldSet">
            <FormField
              name="city-rpt"
              displayName="Hello World"
              type="TextBox"
            />
            <FormField
              name="active-rpt"
              displayName="Hello World"
              type="CheckBox"
            />
            <FormFieldSet name="set1" type="FieldSet">
              <FormField
                name="date"
                displayName="Hello World DATE"
                type="Date"
              />
            </FormFieldSet>
          </FormFieldSet>
        </DynamicForm> */}
      </Grid>
    </div>
  );
}

export default HomePage;
