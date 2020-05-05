import { Grid } from "@material-ui/core";
import { get, uniqueId } from "lodash/fp";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useDynamicForm } from "../Context/DynamicFormContext";
import {
  FormFieldChildType,
  FormFieldValue,
} from "../Types/FormFieldChildProps";
import { FieldMapping } from "../Utils/FormUtil";

export type FormFieldProps = {
  type: FormFieldChildType;
  displayName: string;
  name: string;
  [key: string]: any;
};

const FormField: FunctionComponent<FormFieldProps> = (
  props: FormFieldProps
) => {
  const { type, name, displayName, ...other } = props;
  //Lazy initialize the state value. Will be called only on first render.
  const [id] = useState(() => uniqueId("form-component-"));

  const [visited, setVisited] = useState(false);
  const [state, dispatch] = useDynamicForm();
  const fieldValue = get(name, state.values);
  debugger;
  const Component = FieldMapping[type];

  const dispatchChangeEvent = (value: FormFieldValue) => {
    dispatch({
      type: "change",
      payload: {
        value: value,
        name: name,
      },
    });
  };
  return (
    <React.Fragment>
      <Grid item xs={12} sm={3}>
        <label htmlFor={id}>{props.displayName}</label>
      </Grid>
      <Grid item xs={12} sm={9}>
        {
          <Component
            {...other}
            id={id}
            onBlur={() => setVisited(true)}
            onValueChange={dispatchChangeEvent}
            value={fieldValue}
          />
        }
      </Grid>
    </React.Fragment>
  );
};

export default FormField;
