import { useContext } from "react";
import { AlertContext, AlertObject } from "../components/AlertsProvider";

const useAlert = () => useContext(AlertContext) as AlertObject;

export default useAlert;
