import React from "react";
import { MainPage } from "./components/MainPage";
import { Room } from "./components/Room";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory, createHashHistory } from "history";
import "./css/toastify.css";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isElectron } from "./utils";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <AppBar className={classes.appbar}>
          <ToolBar>
            <Typography>Welcome To The Game</Typography>
          </ToolBar>
        </AppBar>
        {/* <ToolBar /> */}
        <MainPage></MainPage>
        {/* <Router history={createHashHistory()}>
          <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/room/:id" component={Room}></Route>
          </Switch>
        </Router> */}
        <ToastContainer position="bottom-right" hideProgressBar />
      </header>
    </div>
  );
}

export default App;
