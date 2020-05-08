import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        Code is Poetry
      </Typography>
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      verticalAlign: "middle",
    },
    fav: {
      fill: "red",
      height: "0.65em",
    },
  })
);

export default Footer;
