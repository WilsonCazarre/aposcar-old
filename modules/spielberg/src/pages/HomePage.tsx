import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import CollapsableCard from "../components/CollapsableCard";

const HomePage: React.FC = () => {
  const [card1Open, setCard1Open] = useState(true);

  return (
    <PageWrapper>
      <div className="flex w-full space-y-7 flex-col md:flex-row md:space-x-7 md:space-y-0">
        <CollapsableCard
          title="Global Ranking"
          collapse={card1Open}
          setCollapse={setCard1Open}
        >
          hey
        </CollapsableCard>
        <CollapsableCard
          title="Oscar Winners Live"
          collapse={!card1Open}
          setCollapse={setCard1Open}
        >
          hey
        </CollapsableCard>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
