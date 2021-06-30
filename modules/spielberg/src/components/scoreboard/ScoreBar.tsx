import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { APOSCAR_YELLOW } from "../../utils/constants";

interface Props {
  score: number;
}

const ScoreBar: React.FC<Props> = ({ score }) => {
  return (
    <ProgressBar
      bgColor={APOSCAR_YELLOW}
      completed={(score * 100) / 24}
      baseBgColor="#FFF"
      isLabelVisible={false}
      height="5px"
    />
  );
};

export default ScoreBar;
