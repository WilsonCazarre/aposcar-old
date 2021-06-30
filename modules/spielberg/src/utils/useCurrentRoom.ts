import { useContext } from "react";
import {
  RoomContext,
  RoomContextProps,
} from "../components/scoreboard/RoomProvider";

export default function useCurrentRoom() {
  return useContext(RoomContext) as RoomContextProps;
}
