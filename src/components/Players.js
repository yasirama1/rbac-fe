import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PlayerRow } from "./PlayerRow";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {
  selectPlayers,
  addPly,
  selectSelectedPlayers,
  addRm,
  selectRooms,
  addToRoom,
} from "../store/mainSlice";
import { store } from "../store/store";

const useStyles = makeStyles({
  root: {
    width: "45%",
    height: "580px",
    maxWidth: "45%",
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
export function Players() {
  const players = useSelector(selectPlayers);
  const rooms = useSelector(selectRooms);
  const selectedPlayers = useSelector(selectSelectedPlayers);
  console.log(selectedPlayers);
  const classes = useStyles();
  const [nameToSend, setNameToSend] = useState("");
  const [roomNameToSend, setRoomNameToSend] = useState("");
  const [roomIdToSend, setRoomIdToSend] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openRoomAdd, setOpenRoomAdd] = React.useState(false);
  const [openAddToRoom, setOpenAddToRoom] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRoomAdd = () => {
    setOpenRoomAdd(true);
  };

  const handleCloseRoomAdd = () => {
    setOpenRoomAdd(false);
  };

  const handleClickOpenAddToRoom = () => {
    setOpenAddToRoom(true);
  };

  const handleCloseAddToRoom = () => {
    setOpenAddToRoom(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <Grid container direction="column">
          <Box pt={3} pb={2}>
            <Paper elevation={0}>Players</Paper>
          </Box>
          <Divider />
          <Box pt={3}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                container
                xs={12}
                sm={6}
                direction="row"
                justifyContent="flex-start"
              >
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen()}
                  >
                    Add a player
                  </Button>
                </Grid>
              </Grid>

              <Grid
                container
                xs={12}
                sm={6}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    disabled={
                      Object.keys(selectedPlayers).length > 0 ? false : true
                    }
                    color="primary"
                    onClick={() => handleClickOpenRoomAdd()}
                  >
                    Create Room
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    disabled={
                      Object.keys(selectedPlayers).length > 0 ? false : true
                    }
                    color="primary"
                    onClick={() => handleClickOpenAddToRoom()}
                  >
                    Add to room
                  </Button>
                </Grid>
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
            {dialogueDynamic(
              open,
              handleClose,
              setNameToSend,
              nameToSend,
              addPlayer,
              "Nickname",
              "button"
            )}
            {dialogueDynamic(
              openRoomAdd,
              handleCloseRoomAdd,
              setRoomNameToSend,
              roomNameToSend,
              createRoom,
              "Room Name",
              "button"
            )}
            {dialogueDynamic(
              openAddToRoom,
              handleCloseAddToRoom,
              setRoomIdToSend,
              roomIdToSend,
              addIntoRoom,
              "Select Room",
              "select",
              rooms
            )}

            {playerMap(players)}
          </Grid>
        </Grid>
      </Card>
    </>
  );

  function createRoom() {
    store.dispatch(addRm(roomNameToSend, Object.keys(selectedPlayers)));
    setOpenRoomAdd(false);
  }
  function addPlayer() {
    store.dispatch(addPly(nameToSend));
    setOpen(false);
  }
  function addIntoRoom() {
    store.dispatch(addToRoom(roomIdToSend, Object.keys(selectedPlayers)));
    setOpenAddToRoom(false);
  }

  function playerMap(players) {
    return players?.map((player) => PlayerRow(player));
  }
  function dialogueDynamic(
    openVar,
    handleCloseVar,
    setNameToSendVar,
    nameToSendVar,
    addPlayerVar,
    placeHolder,
    selectOrButton,
    selectOptions
  ) {
    console.log("openVar");
    console.log(openVar);
    return (
      <Dialog
        open={openVar}
        onClose={handleCloseVar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Enter Name"}</DialogTitle> */}
        <DialogContent>
          {UserEntry(
            setNameToSendVar,
            nameToSendVar,
            placeHolder,
            selectOrButton,
            selectOptions
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVar} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addPlayerVar()} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function UserEntry(
    setValue,
    value,
    placeHolder,
    selectOrButton,
    selectOptions
  ) {
    if (selectOrButton === "select") {
      return selectOptions.length == 0 ? (
        "No rooms available"
      ) : (
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          onChange={(val) => setRoomIdToSend(val.target.value)}
        >
          {mapValuesToDom(selectOptions)}
        </Select>
      );
    } else {
      return (
        <TextField
          onChange={(val) => setValue(val.target.value)}
          value={value}
          id="outlined-basic"
          label={placeHolder}
          variant="outlined"
        />
      );
    }
    function mapValuesToDom(values) {
      return values.map((val) => {
        return <MenuItem value={val._id}>{val.name}</MenuItem>;
      });
    }
  }
}
