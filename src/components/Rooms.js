import React from "react";
import { useSelector } from "react-redux";
import { RoomRow } from "./RoomRow";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { selectRooms } from "../store/mainSlice";

const useStyles = makeStyles({
  root: {
    width: "45%",
    height: "580px",
    maxWidth: "45%",
    margin: "auto",
    overflow: "auto",
  },
});

export function Rooms() {
  const rooms = useSelector(selectRooms);
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Box pt={3} pb={2}>
          <Paper elevation={0}>Rooms</Paper>
        </Box>
        <Divider />

        <Grid
          container
          // spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {roomMap(rooms)}
        </Grid>
      </Card>
    </>
  );

  function roomMap(rooms) {
    return rooms?.map((room) => RoomRow(room));
  }
}
