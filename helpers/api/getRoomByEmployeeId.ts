import { IRoom } from "interfaces/Room";
import { IEmployee } from "interfaces/User";
import { getUserDataById } from "./getUserDataById";

export const getRoomByEmployeeId = async (uid: number) => {
  const user = await getUserDataById(uid) as IEmployee
  const roomsResponse = await fetch(`http://localhost:3001/rooms`);
  const allRooms = await roomsResponse.json() as IRoom[]
  const room = allRooms.find(room=>room.id === user.worksAt)
  return room;
};
