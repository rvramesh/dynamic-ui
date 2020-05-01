import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./Scenes/Home/HomePage";
import InfoPage from "./Scenes/Info/InfoPage";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64,
    },
  },
}));

function Routes() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/home" component={HomePage} />
      <Route exact={true} path="/info" component={InfoPage} />
    </div>
  );
}

export default Routes;
