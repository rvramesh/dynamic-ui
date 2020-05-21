import * as React from "react";
import DynamicForm, {
  FormChildProps,
} from "../../Common/Components/DynamicForm";
import { FormValues } from "../../Common/Context/DynamicFormContext";

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
      displayName: "State",
      type: "MultiSelect",
      entity: "states",
      url: "http://localhost:4000/",
      rules: {
        min: {
          value: "2",
          message: "Minimum $[0] is required",
        },
        max: {
          value: "3",
          message: "Maximum $[0] is required",
        },
      },
    },
    {
      name: "date",
      displayName: "Min & Max",
      type: "Date",
      rules: {
        min: { value: "-1m", message: "The value entered should be more $[0]" },

        max: {
          value: "2020-05-20",
          message: "The value entered should be less than $[0]",
        },
      },
    },
    {
      name: "number",
      displayName: "Percentage",
      type: "NumericTextBox",
      format: "p4",
      rules: {
        min: { value: "0", message: "The value entered should be more $[0]" },

        max: {
          value: "0.50",
          message: "The value entered should be less than 50%",
        },
      },
    },
    {
      name: "currency",
      displayName: "Currency",
      type: "NumericTextBox",
      format: "c2",
      rules: {
        min: { value: "0", message: "The value entered should be more $[0]" },

        max: {
          value: "5000",
          message: "The value entered should be less than $[0]",
        },
      },
    },
    {
      name: "datetime",
      displayName: "Date & Time",
      type: "DateTime",
    },
    {
      name: "time",
      displayName: "Time",
      type: "Time",
    },
    {
      name: "dateRange",
      displayName: "Date Range",
      type: "DateRange",
    },
    {
      avoidPadLeft: true,
      name: "set2",
      rules: {
        min: { value: 2, message: "Minimum Two sets" },
        max: { value: 5, message: "Maximum Two sets" },
      },
      type: "FieldSet",
      childProps: [
        {
          name: "city-rpt",
          displayName: "Email",
          type: "TextBox",
          rules: {
            min: {
              value: 5,
              message: "Field should be minimum 5 characters long.",
            },
            regex: [
              {
                value:
                  "^([a-zA-Z0-9_\\-.]+)@([a-zA-Z0-9_\\-.]+).([a-zA-Z]{2,5})$",
                message: "Enter a valid email",
              },
              {
                value: "^([a-zA-Z0-9_\\-.]+)@([a-zA-Z0-9_\\-.]+).gmail.com$",
                message: "No Gmail",
              },
            ],
          },
        },
        {
          name: "active-rpt",
          displayName: "Check Box",
          type: "CheckBox",
          rules: {
            required: {
              value: true,
              message: "This needs to be checked",
            },
          },
        },
        {
          name: "set1",
          type: "FieldSet",
          rules: {
            min: { value: 0, message: "Collection is litte" },
          },
          childProps: [
            {
              name: "date",
              displayName: "Nested Date Collection",
              type: "Date",
              rules: {
                required: {
                  value: true,
                  message: "You missed this!",
                },
              },
            },
          ],
        },
      ],
    },
  ];

  const [formEntry, setFormEntry] = React.useState<FormValues>();
  return (
    <div>
      <DynamicForm
        formSchema={formSchema}
        clearText="Clear"
        submitText="Submit"
        onSubmit={(value, validationState) => {
          if (validationState.isValid) {
            setFormEntry(value);
          } else {
            alert("Fix errors");
          }
        }}
      ></DynamicForm>
    </div>
  );
}

export default InfoPage;
