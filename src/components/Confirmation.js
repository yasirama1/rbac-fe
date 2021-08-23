import React from 'react';
import { useSelector } from 'react-redux';
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {
  selectRooms
} from '../store/mainSlice';
// import styles from './Counter.module.css';

export function Rooms() {
  const rooms = useSelector(selectRooms);
  // console.log("here are they")

  // const incrementValue = Number(incrementAmount) || 0;

  return (
    <>
      {roomMap(rooms)}
    </>
  );

  function roomMap(rooms) {
    return rooms?.map((room) => <span>{room.name}</span>)
  }
}
