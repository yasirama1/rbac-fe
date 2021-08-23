import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectRooms
} from '../store/mainSlice';

export function Rooms() {
  const rooms = useSelector(selectRooms);

  return (
    <>
      {roomMap(rooms)}
    </>
  );

  function roomMap(rooms) {
    return rooms?.map((room) => <span>{room.name}</span>)
  }
}
