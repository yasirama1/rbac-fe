import React from "react";
import Grid from "@material-ui/core/Grid";
import { Rooms } from "./Rooms";
import { Players } from "./Players";
import { Room } from "./Room";
import { store } from "../store/store";
import { useSelector } from "react-redux";
import { getPlayers, getRooms, selectCurrentScreen } from "../store/mainSlice";

export function MainPage() {
  store.dispatch(getPlayers());
  store.dispatch(getRooms());
  const curScreen = useSelector(selectCurrentScreen);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* {showMain()} */}
        {curScreen === "home" ? <Rooms></Rooms> : <div></div>}
        {curScreen === "home" ? <Players></Players> : <div></div>}
        {curScreen !== "home" ? <Room></Room> : <div></div>}
      </Grid>
    </>
  );

  function showMain() {
    if (curScreen === "home") {
      return (
        <div>
          <Rooms></Rooms>
          <Players></Players>
        </div>
      );
    } else {
      return <Room></Room>;
    }
  }
}
