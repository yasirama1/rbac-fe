import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { store } from "../store/store";
import { Link } from "react-router-dom";
import { deleteRm, setCurrentScreen } from "../store/mainSlice";

export function RoomRow(room) {
  return (
    <React.Fragment key={room._id}>
      <Box width="100%" pt={4} pb={2}>
        <Grid container direction="row">
          <Grid item xs={12} sm={3}>
            {room.name}
          </Grid>
          <Grid item xs={12} sm={3}>
            {room.players.length === 0
              ? deleteRoom(room._id)
              : room.players.length + " "}
            player(s)
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                store.dispatch(setCurrentScreen(`room/${room._id}`))
              }
              // component={Link}
              // to={`/room/${room._id}`}
            >
              View
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteRoom(room._id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
  function deleteRoom(id) {
    console.log("Came here once");
    store.dispatch(deleteRm(id));
  }
}
