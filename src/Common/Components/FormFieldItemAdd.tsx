import {
  Button,
  Grid,
  SvgIcon,
  SvgIconProps,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import * as React from "react";

interface Props {
  addClicked: () => void;
}

function AddIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      />
    </SvgIcon>
  );
}

const GreenButton = withStyles((theme) => ({
  root: {
    color: green[500],
    borderColor: green[500],
  },
}))(Button);

function FormFieldItemAdd(props: Props) {
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

export default FormFieldItemAdd;
