import { Button, withStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

const RedButton = withStyles((theme) => ({
  root: {
    color: red[500],
    borderColor: red[500],
  },
}))(Button);

const GreenButton = withStyles((theme) => ({
  root: {
    color: green[500],
    borderColor: green[500],
  },
}))(Button);

export { RedButton, GreenButton };
