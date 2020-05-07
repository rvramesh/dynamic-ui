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
import { FieldMapping, FieldValidatorMapping } from "../Utils/FormUtil";

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

  const [visited, setVisited] = useState(false);
  const [state, dispatch] = useDynamicForm();
  const fieldValue = get(name, state.values);
  const Component = FieldMapping[type];
  const validator = FieldValidatorMapping[type];
  const showInitialStateError = false;
  let validationResponse: ValidationResponse = { valid: true };
  if (visited || showInitialStateError) {
    validationResponse = validator(rules, fieldValue);
  }

  const styles = useStyles();

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
      <Grid
        item
        xs={12}
        sm={3}
        className={!validationResponse.valid ? styles.errorContainer : ""}
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
        sm={9}
        className={!validationResponse.valid ? styles.errorContainer : ""}
      >
        {
          <Component
            {...other}
            id={id}
            onBlur={() => setVisited(true)}
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
          className={!validationResponse.valid ? styles.errorContainer : ""}
        >
          {validationResponse.message}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default FormField;
