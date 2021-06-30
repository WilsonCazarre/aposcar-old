import { useContext } from "react";
import {
  RoomContext,
  RoomContextProps,
} from "../components/scoreboard/RoomProvider";

export default function useCurrentRoomId() {
  return useContext(RoomContext) as RoomContextProps;
}
