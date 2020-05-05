import { Grid } from "@material-ui/core";
import * as React from "react";
import { GreenButton } from "../Utils/ButtonUtil";
import { AddIcon } from "../Utils/IconUtil";

interface FormFieldItemAddButtonProps {
  addClicked: () => void;
}

function FormFieldItemAddButton(props: FormFieldItemAddButtonProps) {
  const { addClicked } = props;

  return (
    <Grid item xs={12}>
      <GreenButton
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addClicked}
        size="small"
      >
        Add
      </GreenButton>
    </Grid>
  );
}

export default FormFieldItemAddButton;
