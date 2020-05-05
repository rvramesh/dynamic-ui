import {
  Button,
  Grid,
  SvgIcon,
  SvgIconProps,
  withStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import * as React from "react";

interface Props {
  removeClicked: () => void;
}

function DeleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      />
    </SvgIcon>
  );
}

const ErrorButton = withStyles((theme) => ({
  root: {
    color: red[500],
    borderColor: red[500],
  },
}))(Button);

function FormFieldItemRemove(props: Props) {
  const { removeClicked } = props;

  return (
    <Grid item xs={12}>
      <ErrorButton
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={removeClicked}
        size="small"
      >
        Remove
      </ErrorButton>
    </Grid>
  );
}

export default FormFieldItemRemove;
