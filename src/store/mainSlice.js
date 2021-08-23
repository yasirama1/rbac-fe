import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { fetchCount } from './playerAPI';
import {
  indexPlayers,
  deletePlayer,
  addPlayer,
} from "../services/PlayerService.js";
import {
  indexRooms,
  addPlayersToRoom,
  kickPlayer,
  addRoom,
  deleteRoom,
} from "../services/RoomService";

const initialState = {
  players: [],
  rooms: [],
  selectedPlayers: {},
  currentScreen: "home",
};

export const getPlayers = () => async (dispatch, getState) => {
  let newPlayers = await indexPlayers();
  dispatch(setPlayers(newPlayers.data.data));
};
export const getRooms = () => async (dispatch, getState) => {
  let newRooms = await indexRooms();
  dispatch(setRooms(newRooms.data.data));
};
export const addToRoom = (roomId, playerIds) => async (dispatch, getState) => {
  let newData = await addPlayersToRoom({
    roomId: roomId,
    playerIds: playerIds,
  });
  toast.success("Player(s) added successfully");
  dispatch(setSelectedPlayers({}));
  dispatch(setRooms(newData.data.data.rooms));
  dispatch(setPlayers(newData.data.data.players));
};
export const deletePly = (playerId) => async (dispatch, getState) => {
  let newData = await deletePlayer(playerId);
  toast.success("Player deleted successfully");
  dispatch(setRooms(newData.data.data.rooms));
  dispatch(setPlayers(newData.data.data.players));
};
export const addPly = (name) => async (dispatch, getState) => {
  let newData = await addPlayer({ nickname: name });
  toast.success("Player added successfully");
  dispatch(setPlayers(newData.data.data));
};
export const deleteFromRoom =
  (roomId, playerId) => async (dispatch, getState) => {
    let newData = await kickPlayer(roomId, playerId);
    toast.success("Player kicked successfully");
    dispatch(setRooms(newData.data.data.rooms));
    dispatch(setPlayers(newData.data.data.players));
  };
export const deleteRm = (roomId) => async (dispatch, getState) => {
  let newData = await deleteRoom(roomId);
  toast.success("Room deleted successfully");
  dispatch(setRooms(newData.data.data.rooms));
  dispatch(setPlayers(newData.data.data.players));
};
export const addRm = (name, listOfIds) => async (dispatch, getState) => {
  let newData = await addRoom({ name: name, players: listOfIds });
  toast.success("Room added successfully");
  dispatch(setSelectedPlayers({}));
  dispatch(setRooms(newData.data.data.rooms));
  dispatch(setPlayers(newData.data.data.players));
};
export const selectPlayer = (playerId) => async (dispatch, getState) => {
  dispatch(addToSelectedPlayers(playerId));
};
export const deSelectPlayer = (playerId) => async (dispatch, getState) => {
  dispatch(removeFromSelectedPlayers(playerId));
};
export const playerSlice = createSlice({
  name: "player",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload.reverse();
    },
    setSelectedPlayers: (state, action) => {
      state.selectedPlayers = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    addToSelectedPlayers: (state, action) => {
      state.selectedPlayers[action.payload] = true;
    },
    removeFromSelectedPlayers: (state, action) => {
      delete state.selectedPlayers[action.payload];
    },
  },
});

export const {
  setPlayers,
  setRooms,
  addToSelectedPlayers,
  removeFromSelectedPlayers,
  setSelectedPlayers,
  setCurrentScreen,
} = playerSlice.actions;

export const selectPlayers = (state) => state.player.players;
export const selectRooms = (state) => state.player.rooms;
export const selectSelectedPlayers = (state) => state.player.selectedPlayers;
export const selectCurrentScreen = (state) => state.player.currentScreen;
export const selectRoomPlayers = (roomId) => (store) => {
  return store.player.players.filter((player) => roomId === player.room?._id);
};
export default playerSlice.reducer;
