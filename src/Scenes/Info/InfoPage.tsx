import { Grid } from "@material-ui/core";
import * as React from "react";
import DynamicForm, {
  FormChildProps,
} from "../../Common/Components/DynamicForm";

function InfoPage() {
  const formSchema: FormChildProps[] = [
    {
      name: "country",
      displayName: "Country",
      type: "Select",
      entity: "countries",
      url: "http://localhost:4000/",
    },
    {
      name: "state",
      displayName: "Hello World",
      type: "MultiSelect",
      entity: "states",
      url: "http://localhost:4000/",
    },
    {
      name: "date",
      displayName: "Min & Max",
      type: "Date",
      min: "-1m",
      max: "2020-05-20",
    },
    {
      name: "number",
      displayName: "number",
      type: "NumericTextBox",
      format: "p2",
      min: "0",
      max: "0.50",
    },
    {
      name: "datetime",
      displayName: "Hello World",
      type: "DateTime",
    },
    {
      minOccurance: 1,
      avoidPadLeft: true,
      name: "set2",
      maxOccurance: 2,
      type: "FieldSet",
      childProps: [
        {
          name: "city-rpt",
          displayName: "Hello World",
          type: "TextBox",
        },
        {
          name: "active-rpt",
          displayName: "Hello World",
          type: "CheckBox",
        },
        {
          minOccurance: 1,
          name: "set1",
          type: "FieldSet",
          childProps: [
            {
              name: "date",
              displayName: "Hello World DATE",
              type: "Date",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Grid container spacing={1}>
        <DynamicForm formSchema={formSchema}></DynamicForm>
      </Grid>
    </div>
  );
}

export default InfoPage;
