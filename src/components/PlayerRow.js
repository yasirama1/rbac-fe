import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import EventBusy from "@material-ui/icons/EventBusy";
import Adjust from "@material-ui/icons/Adjust";
import { store } from "../store/store";
import { selectPlayer, deSelectPlayer, deletePly } from "../store/mainSlice";
import { Divider } from "@material-ui/core";

export function PlayerRow(player) {
  return (
    <React.Fragment key={player._id}>
      <Box width="100%" pt={4} pb={2}>
        <Grid container direction="row">
          <Grid item xs={12} sm={3}>
            {checkbox()}
          </Grid>
          <Grid item xs={12} sm={3}>
            {player.nickname}
          </Grid>
          <Grid item xs={12} sm={3}>
            {player.status === 1 ? <Adjust color="secondary" /> : <EventBusy />}
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deletePlayer(player._id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
        <Divider></Divider>
      </Box>
    </React.Fragment>
  );

  function checkbox() {
    return player.status === 1 ? (
      <FormControlLabel
        control={
          <Checkbox onChange={handleCheckbox} name="checkedB" color="primary" />
        }
      />
    ) : null;
  }
  function deletePlayer(id) {
    store.dispatch(deletePly(id));
  }

  function handleCheckbox(e) {
    e.target.checked === true
      ? store.dispatch(selectPlayer(player._id))
      : store.dispatch(deSelectPlayer(player._id));
    console.log(e.target.checked);
  }
}
