import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { store } from "../store/store";
import { useHistory } from "react-router-dom";
import { deleteFromRoom, deleteRm, setCurrentScreen } from "../store/mainSlice";

export function RoomPlayerRow(roomId, player, players) {
  const history = useHistory();

  return (
    <React.Fragment key={player._id}>
      <Box width="100%" pt={4} pb={2}>
        <Grid container direction="row">
          <Grid item xs={12} sm={6}>
            {player.nickname}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => kickFromRoom(player._id)}
            >
              Kick
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );

  function kickFromRoom(playerId) {
    if (players.length === 1) {
      store.dispatch(deleteRm(roomId));
      store.dispatch(setCurrentScreen("home"));
      // history.push("/");
    } else {
      store.dispatch(deleteFromRoom(roomId, playerId));
    }
  }
}
