import { Grid } from "@material-ui/core";
import * as React from "react";
import { RedButton } from "../Utils/ButtonUtil";
import { RemoveIcon } from "../Utils/IconUtil";

interface FormFieldItemRemoveButtonProps {
  removeClicked: () => void;
}

function FormFieldItemRemoveButton(props: FormFieldItemRemoveButtonProps) {
  const { removeClicked } = props;

  return (
    <Grid item xs={12}>
      <RedButton
        variant="outlined"
        startIcon={<RemoveIcon />}
        onClick={removeClicked}
        size="small"
      >
        Remove
      </RedButton>
    </Grid>
  );
}

export default FormFieldItemRemoveButton;
