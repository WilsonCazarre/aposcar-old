import React from "react";
import { Indication } from "../types/interfaces";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "./Button";

interface Props {
  indication?: Indication;
}

const NomineeCard: React.FC<Props> = ({ indication }) => {
  return (
    <div className="text-3xl mb-10 w-1/2">
      {indication ? (
        <div className="flex space-x-3 align-bottom">
          <div className="flex flex-col justify-end w-1/2">
            <p className="font-bold text-right">{indication.nominated.name}</p>
            <p className="text-base font-light text-right mb-6">
              ({indication.annotation})
            </p>
            <p className="text-right text-lg h-4/5 flex-shrink">
              {indication.nominated.description}
            </p>
            <Button styleType={"primary"} className="text-xl ml-48 mb-5">
              Place Bet
            </Button>
          </div>
          <div className="w-2/5 h-4/5">
            <img
              className="max-h-full max-w-full"
              src={indication.nominated.pictureUrl}
              alt={indication.nominated.name}
            />
          </div>
        </div>
      ) : (
        <p className="text-2xl text-right">
          Select a nominee to <br />
          see more about them
        </p>
      )}
    </div>
  );
};

export default NomineeCard;
