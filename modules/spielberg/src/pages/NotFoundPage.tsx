import React from "react";
import PageWrapper from "../components/PageWrapper";

const NotFoundPage: React.FC = () => {
  return (
    <PageWrapper>
      <div className="w-full flex flex-col items-center mt-16">
        <div className="relative z-0 text-gray-900 font-bold">
          <p className="sm:text-5xl text-2xl">and the oscar goes to...</p>
          <p className="text-left line-through sm:text-9xl text-6xl">
            La La Land
          </p>
          <p className="font-normal absolute z-40 top-0 sm:top-6 transform -rotate-12 text-yellow text-8xl sm:text-9xl text-center w-full sm:scale-150">
            404
          </p>
        </div>
        <p className="text-2xl sm:text-3xl text-center mt-10">
          ops... mistakes happens! <br />
          this page doesn’t exist
        </p>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
