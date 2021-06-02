import React from "react";

import PageWrapper from "../components/PageWrapper";
import { useCategories } from "../hooks/api";
import CategoryLink from "../components/CategoryLink";
import LoadingComponent from "../components/LoadingComponent";

const CategoryListPage: React.FC = () => {
  const { data, isLoading } = useCategories();

  return (
    <PageWrapper>
      {isLoading && <LoadingComponent />}
      <div className="flex flex-wrap justify-center">
        {data &&
          data.map((category) => (
            <div key={category.id}>
              <CategoryLink category={category} />
            </div>
          ))}
      </div>
    </PageWrapper>
  );
};

export default CategoryListPage;
