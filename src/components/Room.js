import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { RoomPlayerRow } from "./RoomPlayerRow";
import { store } from "../store/store";

import {
  selectCurrentScreen,
  selectRoomPlayers,
  setCurrentScreen,
} from "../store/mainSlice";
const useStyles = makeStyles({
  root: {
    width: "45%",
    height: "580px",
    maxWidth: "45%",
    // minHeight: "580px",
    // maxHeight: "580px",
    margin: "auto",
    overflow: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function Room(data) {
  const classes = useStyles();
  const curScreen = useSelector(selectCurrentScreen);
  let roomId = curScreen.split("/")[1];
  console.log(curScreen);
  const players = useSelector(selectRoomPlayers(roomId));
  return (
    <>
      <Card className={classes.root}>
        <Box width="100%" pt={4} pb={2}>
          <Grid container direction="row">
            <Grid item xs={12} sm={6}>
              <Paper elevation={0}>Players</Paper>
              {/* {player.nickname} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => store.dispatch(setCurrentScreen("home"))}
              >
                Home
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {playerMap(players)}
        </Grid>
      </Card>
    </>
  );

  function playerMap(players) {
    return players?.map((player) => RoomPlayerRow(roomId, player, players));
  }
}
