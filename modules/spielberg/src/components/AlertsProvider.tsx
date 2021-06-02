import React, { useState } from "react";

export interface AlertObject {
  setAlert: (message: string) => void;
}

export const AlertContext = React.createContext<AlertObject | null>(null);

const AlertsProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");

  const setAlert = (newMessage: string) => {
    setMessage(newMessage);
    setShow(true);
  };

  return (
    <AlertContext.Provider value={{ setAlert }}>
      <div
        className={`text-center text-black bg-yellow flex justify-center p-1 ${
          show ? "" : "hidden"
        }`}
      >
        <p className="mr-5">{message}</p>
        <button
          className="bg-gray-800 text-white py-0.5 rounded text-sm px-5"
          onClick={() => setShow(false)}
        >
          Dismiss
        </button>
      </div>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertsProvider;
