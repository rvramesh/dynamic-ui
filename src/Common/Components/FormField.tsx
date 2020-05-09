import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { get, uniqueId } from "lodash/fp";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useDynamicForm } from "../Context/DynamicFormContext";
import {
  FormFieldChildType,
  FormFieldValue,
  ValidationResponse,
  ValidationRules,
} from "../Types/FormFieldChildProps";
import { FieldMapping } from "../Utils/FormUtil";

export type FormFieldProps = {
  type: FormFieldChildType;
  displayName: string;
  name: string;
  rules?: ValidationRules;
  [key: string]: unknown;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    required: {
      "&:after": {
        color: "#e32",
        content: '" *"',
        display: "inline",
      },
    },
    errorContainer: {
      backgroundColor: "#f4c2c2",
    },
    gridCell: {
      padding: "5px",
    },
  })
);

const FormField: FunctionComponent<FormFieldProps> = (
  props: FormFieldProps
) => {
  let { type, name, displayName, rules, ...other } = props;
  other = {
    ...other,
    min: props.rules?.min?.value,
    max: props.rules?.max?.value,
  };
  //Lazy initialize the state value. Will be called only on first render.
  const [id] = useState(() => uniqueId("form-component-"));

  const [state, dispatch] = useDynamicForm();
  const fieldValue = get(name, state.values);
  const visited = get(name, state.visited) === true;
  const Component = FieldMapping[type];

  let validationResponse: ValidationResponse = { valid: true };
  if (visited || state.showError) {
    validationResponse = get("errors." + name, state.validationState) ?? {
      valid: true,
    };
  }

  const styles = useStyles();

  const dispatchVisited = () => {
    dispatch({
      type: "visited",
      payload: {
        name: name,
      },
    });
  };
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
    <Grid item xs={12} sm={3}>
      <Grid
        item
        xs={12}
        className={`${styles.gridCell} ${
          !validationResponse.valid ? styles.errorContainer : ""
        }`}
      >
        <label
          htmlFor={id}
          className={rules?.required?.value ? styles.required : ""}
        >
          {props.displayName}
        </label>
      </Grid>
      <Grid
        item
        xs={12}
        className={`${styles.gridCell} ${
          !validationResponse.valid ? styles.errorContainer : ""
        }`}
      >
        {
          <Component
            {...other}
            id={id}
            onBlur={() => dispatchVisited()}
            onValueChange={dispatchChangeEvent}
            value={fieldValue}
            valid={validationResponse.valid}
          />
        }
      </Grid>
      {!validationResponse.valid && (
        <Grid
          item
          xs={12}
          className={`${styles.gridCell} ${
            !validationResponse.valid ? styles.errorContainer : ""
          }`}
        >
          {validationResponse.message}
        </Grid>
      )}
    </Grid>
  );
};

export default FormField;
