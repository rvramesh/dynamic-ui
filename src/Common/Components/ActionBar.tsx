import { Button, Grid } from "@material-ui/core";
import * as React from "react";
import {
  FormValidationState,
  FormValues,
  useDynamicForm,
} from "../Context/DynamicFormContext";

interface ActionBarProps {
  submitText: string;
  clearText: string;
  onSubmit: (values: FormValues, validationState: FormValidationState) => void;
}

function ActionBar(props: ActionBarProps) {
  const { submitText, clearText, onSubmit } = props;
  const [state, dispatch] = useDynamicForm();
  return (
    <Grid item xs={12}>
      <Button
        onClick={() => {
          dispatch({ type: "submit" });
          onSubmit(state.values, state.validationState);
        }}
      >
        {submitText}
      </Button>
      <Button onClick={() => dispatch({ type: "clear" })}>{clearText}</Button>
    </Grid>
  );
}

export default ActionBar;
