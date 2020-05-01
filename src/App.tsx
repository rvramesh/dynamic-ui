import { AppBar, Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "@progress/kendo-theme-default/dist/all.css";
import { createBrowserHistory } from "history";
import React from "react";
import { Link, Router } from "react-router-dom";
import Footer from "./Footer";
import Routes from "./Routes";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Container>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Dynamic UI
            </Typography>
            &nbsp;<Link to="/">Home</Link>
            &nbsp;<Link to="/info">Info</Link>
          </Toolbar>
        </AppBar>

        <Box my={10}>
          <Routes />
          <Footer />
        </Box>
      </Container>
    </Router>
  );
}
