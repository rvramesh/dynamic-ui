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
      rules: {
        required: {
          value: true,
          message: "This is required",
        },
      },
    },
    {
      name: "state",
      displayName: "Hello World",
      type: "MultiSelect",
      entity: "states",
      url: "http://localhost:4000/",
      rules: {
        min: {
          value: "2",
          message: "Minimum ${0} is required",
        },
        max: {
          value: "3",
          message: "Maximum ${0} is required",
        },
      },
    },
    {
      name: "date",
      displayName: "Min & Max",
      type: "Date",
      rules: {
        min: { value: "-1m", message: "The value entered should be more ${0}" },

        max: {
          value: "2020-05-20",
          message: "The value entered should be less than ${0}",
        },
      },
      //   {
      //     pattern:"",
      //     message: "The text entered is not a valid value."
      //   },{
      //     required:true,
      //     message :""
      //   },{
      //     minRange:"",
      //     message:""
      //   },
      //   {
      //     maxRange:"",
      //     message:""
      //   }
      // ],
    },
    {
      name: "number",
      displayName: "number",
      type: "NumericTextBox",
      format: "p2",
      rules: {
        min: { value: "0", message: "The value entered should be more ${0}" },

        max: {
          value: "0.50",
          message: "The value entered should be less than 50%",
        },
      },
    },
    {
      name: "datetime",
      displayName: "Hello World",
      type: "DateTime",
    },
    {
      min: 1,
      avoidPadLeft: true,
      name: "set2",
      max: 2,
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
          min: 1,
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
      <Grid container spacing={0}>
        <DynamicForm formSchema={formSchema}></DynamicForm>
      </Grid>
    </div>
  );
}

export default InfoPage;
