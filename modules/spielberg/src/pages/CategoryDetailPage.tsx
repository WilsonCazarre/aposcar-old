import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import PageWrapper from "../components/PageWrapper";
import { useCategory, useIndications } from "../hooks/api";
import LoadingComponent from "../components/LoadingComponent";
import CategoryNavButtons from "../components/CategoryNavButtons";
import { Indication } from "../types/interfaces";
import NomineeCard from "../components/NomineeCard";
import CategoryTitle from "../components/CategoryTitle";

interface Props {
  name: string;
  nextUrl?: string;
  previousUrl?: string;
}

const CategoryDetailPage: React.FC<Props> = ({
  name,
  nextUrl,
  previousUrl,
}) => {
  const { data: category, error } = useCategory(name);
  const { data: indications } = useIndications(category);

  const [activeIndication, setActiveIndication] = useState<Indication>();

  return (
    <PageWrapper>
      <div className="w-full h-full flex justify-end flex-col">
        {error?.response?.status === 404 && <Redirect to={"/app/not-found"} />}
        {indications ? (
          <>
            <div className="flex justify-between items-end">
              <CategoryTitle
                categoryName={name}
                nomineeName={activeIndication?.nominated.name}
              />
              <NomineeCard indication={activeIndication} />
            </div>
            <div className="flex justify-center mb-5 justify-center">
              {indications?.map((indication) => (
                <button
                  key={indication.id}
                  className={`block px-5 border-b-2 border-transparent transition
                    focus:outline-none hover:border-yellow ${
                      indication.id === activeIndication?.id &&
                      "bg-yellow text-black"
                    }`}
                  onClick={() => setActiveIndication(indication)}
                >
                  {indication.nominated.name}
                </button>
              ))}
              {indications?.length === 0 && "Nothing to see in here :P"}
            </div>
            <CategoryNavButtons nextUrl={nextUrl} previousUrl={previousUrl} />
          </>
        ) : (
          <LoadingComponent />
        )}
      </div>
    </PageWrapper>
  );
};

export default CategoryDetailPage;
