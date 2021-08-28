import { useContext } from "react";
import {
  RoomContext,
  RoomContextProps,
} from "../components/rooms/RoomProvider";

export default function useCurrentRoom() {
  return useContext(RoomContext) as RoomContextProps;
}
